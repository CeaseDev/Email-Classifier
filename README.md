# Email Classifier

  

This project is a web application that allows users to log in using Google OAuth, fetch their last X emails from Gmail, and classify them into different categories using OpenAI GPT-4. The application includes features for authentication, email fetching, and email classification.

  

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Getting Started

  

### First, run the development server:

  

```bash

npm  run  dev

# or

yarn  dev

# or

pnpm  dev

# or

bun  dev
```
  

Open  http://localhost:3000  with  your  browser  to  see  the  result.
 
## Prerequisites



Before  you  begin,  ensure  you  have  the  following:

  

 - Node.js  installed
   
  - Google  Cloud  project  with  OAuth  credentials
   
  - OpenAI  API  key
   
   - Environment  Variables

**Create  a  .env.local  file  in  the  root  directory  and  add  the  following  environment  variables:**

  
```
GOOGLE_CLIENT_ID=your-google-client-id

GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXTAUTH_SECRET=your-nextauth-secret

OPENAI_API_KEY=your-openai-api-key

NEXTAUTH_URL=http://localhost:3000
```
  
  

```js

import NextAuth, { DefaultSession } from 'next-auth';

  

declare  module 'next-auth' {

interface Session {

accessToken?: string;

user: {

id: string;

image?: string |  null;

} & DefaultSession['user'];

}

  

interface JWT {

accessToken?: string;

picture?: string;

}

}

```

## Using the Application

1.  **Login**: Click the "Sign in with Google" button to authenticate using Google OAuth.
2.  **Fetch Emails**: After logging in, use the provided interface to fetch emails.
3.  **Classify Emails**: Once emails are fetched, you can classify them into different categories using OpenAI GPT-4.

## Deploying to Vercel

1.  **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
    
2.  **Connect to Vercel**: Go to [Vercel](https://vercel.com/), create a new project, and connect it to your GitHub repository.
    
3.  **Set Environment Variables**: Add the necessary environment variables in Vercel for `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `OPENAI_API_KEY`.
    
4.  **Deploy**: Deploy the project on Vercel.

## License

This project is licensed under the MIT License.