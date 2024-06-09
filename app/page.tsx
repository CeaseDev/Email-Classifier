'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import EmailFetcher from '../components/EmailFetcher';
import TokenInput from '../components/TokenInput';
import Guide from '../components/Guide';
import Appbar from '@/components/Appbar';
import LoginButton from '@/components/LoginButton';

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [hasToken, setHasToken] = useState<boolean>(false);


  useEffect(() => {
    const token = localStorage.getItem('openai_token');
    setHasToken(!!token);
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <LoginButton></LoginButton>
    );
  }
  
  else{
  if (!hasToken) {
    return (
      <>
        <Appbar session={session}></Appbar>
        <div>
        <TokenInput onTokenSave={() => setHasToken(true)} />
        <Guide />
      </div>
      </>
    );
  }
  return (
    <>
    <Appbar session={session}></Appbar>
    <div>
      <EmailFetcher />
    </div>
    </>

  );
  }
};

export default Home;
