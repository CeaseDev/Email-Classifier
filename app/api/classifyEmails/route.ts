import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Email } from '@/types/types';

export async function POST(req: NextRequest) {
  try {
    const { emails, openaiToken } = await req.json();

    if (!openaiToken) {
      return NextResponse.json({ error: "Invalid OpenAI token" }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: openaiToken,
    });

    const classifiedEmails: Email[] = await Promise.all(
      emails.map(async (email: Email) => {
        const content = email.snippet;
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: 'You are a helpful assistant that classifies emails given by me into important, promotional, social, marketing, and spam categories. Only return the keyword important, promotional, social, marketing, and spam nothing else.' },
            { role: 'user', content: `Classify this email: ${content}` },
          ],
          model: 'gpt-4o',
        });

        let classification = 'Unclassified';
        if (completion && completion.choices && completion.choices[0].message && completion.choices[0].message.content) {
          classification = completion.choices[0].message.content.trim();
        }

        return {
          ...email,
          classification,
        };
      })
    );

    return NextResponse.json(classifiedEmails, { status: 200 });
  } catch (error) {
    console.error('Error classifying emails:', error);
    return NextResponse.json({ error: 'Error classifying emails' }, { status: 500 });
  }
}
