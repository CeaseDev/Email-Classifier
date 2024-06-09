import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';

import { Email } from '@/types/types';

const getGmailClient = (accessToken: string) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.gmail({ version: 'v1', auth });
};

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const url = new URL(req.url);
  const maxResults = parseInt(url.searchParams.get('maxResults') || '10', 10);

  try {
    const gmail = getGmailClient(token.accessToken as string);
    const response = await gmail.users.messages.list({ userId: 'me', maxResults });
    const messages = response.data.messages || [];

    const emails: Email[] = await Promise.all(
      messages.map(async (message, index) => {
        const msg = await gmail.users.messages.get({ userId: 'me', id: message.id as string, format: 'full' });
        const snippet = msg.data.snippet || '';
        const content = msg.data.payload?.body?.data || '';
        const decodedContent = Buffer.from(content, 'base64').toString('utf-8');
        return {
          id: index + 1,
          snippet,
          content: decodedContent,
          classification: 'Unclassified',
        };
      })
    );

    return NextResponse.json(emails, { status: 200 });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: 'Error fetching emails' }, { status: 500 });
  }
}