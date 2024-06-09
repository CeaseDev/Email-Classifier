'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Appbar from './Appbar';

const LoginButton: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
        <Appbar session = {session} ></Appbar>
    );
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="hover:scale-110">
        <button
          className="text-white  bg-[#4285F4] hover:bg-[#4285F4] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mb-2"
          onClick={() => signIn('google')}
        >
          <svg className="mr-2 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
