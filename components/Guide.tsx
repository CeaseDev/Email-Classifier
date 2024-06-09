import React from 'react';

const Guide: React.FC = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center rounded-md bg-transparent">
      <h2 className="text-lg font-bold mb-2">How to Get Your OpenAI Token</h2>
      <ol className="list-decimal list-inside">
        <li>Go to the <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">OpenAI Signup Page</a> and create an account.</li>
        <li>After logging in, navigate to the API section in the dashboard.</li>
        <li>Generate a new API key.</li>
        <li>Copy the API key and paste it into the text box below.</li>
      </ol>
    </div>
  );
};

export default Guide;
