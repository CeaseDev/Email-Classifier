import React from 'react';
import { signOut }from 'next-auth/react'
import { Session }  from 'next-auth';
import TokenInput from './TokenInput';
import Guide from './Guide';

interface AppbarProps {
  session: Session;
}

const Appbar: React.FC<AppbarProps> = ({ session }) => {
    if (!session) {
        return null; 
      }
    const userImage = session.user?.image || '' ;
  return (
    <><div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
          <div className='flex flex-row items-center'>
              <img src={userImage} alt ={userImage} className='w-10 h-10 rounded-full mr-4'></img> 
              {session.user?.name}
          </div>
          <div className='ml-4'>
              <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Sign out
              </button>
          </div>
      </div>
    </>
  );
};

export default Appbar;
