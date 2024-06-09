'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const EmailFetcher: React.FC = () => {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [numEmails, setNumEmails] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFetchEmails = async () => {
    if (!session) return;

    setFetching(true);

    try {
      const { data: userEmails } = await axios.get(`/api/fetchEmails?maxResults=${numEmails}`);
      console.log(userEmails) ; 
      const emailsWithID = userEmails.map((email: any, index: number) => ({
        ...email,
        id: index + 1,
        classification: 'Unclassified',
      }));
      setEmails(emailsWithID);

      localStorage.setItem('emails', JSON.stringify(emailsWithID));
      setCurrentPage(0); // Reset to the first page
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleClassifyEmails = async () => {
    if (!session) return;

    setClassifying(true);

    try {
      const openaiToken = localStorage.getItem('openai_token') || '';
      const { data: classifiedEmails } = await axios.post('/api/classify-emails', {
        emails,
        openaiToken,
      });

      setEmails(classifiedEmails);
      localStorage.setItem('classified_emails', JSON.stringify(classifiedEmails));
    } catch (error) {
      console.error('Error classifying emails:', error);
    } finally {
      setClassifying(false);
    }
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && (currentPage + 1) * 7 < emails.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedEmails = emails.slice(currentPage * 7, (currentPage + 1) * 7);

  return (
    <div>
      <div className="mb-4 ml-[10%] mt-5">
        <label className="mr-2">Number of emails:</label>
        <select
          value={numEmails}
          onChange={(e) => setNumEmails(parseInt(e.target.value, 10))}
          className="border rounded-md p-2 text-black "
        >
          {[5, 10, 15, 20, 25, 30].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 mt-5 flex flex-row justify-between">
        <button
          onClick={handleFetchEmails}
          className="bg-blue-500 ml-[10%] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          disabled={fetching}
        >
          {fetching ? 'Fetching Emails...' : 'Fetch Emails'}
        </button>
        <button
          onClick={handleClassifyEmails}
          className="bg-green-500 mr-[10%] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={classifying || emails.length === 0}
        >
          {classifying ? 'Classifying Emails...' : 'Classify Emails'}
        </button>
      </div>

      {emails.length > 0 && (
        <div className="mt-4 ml-5 mr-5">
          <h2 className="text-lg font-bold text-center mb-5">Classified Emails</h2>
          <div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-4">
            {displayedEmails.map((email) => (
              <div key={email.id} className="border rounded-md p-4 flex justify-between gap-10">
                <h3>{email.id}</h3>
                <p>{email.snippet}</p>
                <h3 className="text-md font-bold">{email.classification}</h3>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange('next')}
              disabled={(currentPage + 1) * 7 >= emails.length}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailFetcher;
