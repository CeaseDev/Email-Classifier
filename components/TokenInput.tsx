'use client';

import React, { useState, useEffect } from 'react';

interface TokenInputProps {
  onTokenSave: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ onTokenSave }) => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const savedToken = localStorage.getItem('openai_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSaveToken = () => {
    localStorage.setItem('openai_token', token);
    onTokenSave();
    alert('Token saved successfully!');
  };

  return (
    <div className="p-4  rounded-md bg-transparent shadow-md flex flex-col items-center mt-[20%]">
      <h2 className="text-lg font-bold mb-2">Enter Your OpenAI Token</h2>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border text-black rounded-md p-2 w-[50vw] mb-2"
        placeholder="Enter your OpenAI token here"
      />
      <button
        onClick={handleSaveToken}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Token
      </button>
    </div>
  );
};

export default TokenInput;
