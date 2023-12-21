// chat.tsx
export const config = { runtime: 'client' };

import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react';

export function Chat() {
  const [messages, setMessages] = useState([
    { type: 'response', text: 'Hello! How can I assist you today?' },
  ]);

  const [currentInput, setCurrentInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
      handleSendClick();
      e.preventDefault(); // Prevents the default action of the enter key in a form
    }
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };
  
  const handleSendClick = () => {
    sendMessage(currentInput);
    setCurrentInput('');
  };

  const sendMessage = async (userMessage) => {
    // Add user message
    setMessages([...messages, { type: 'user', text: userMessage }]);
    
    // Send request to your backend server
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
    
    if (response.ok) {
      const data = await response.json();
      // Add server response
      setMessages(m => [...m, { type: 'response', text: data.response }]);
    } else {
      console.error('Server error');
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <ScrollArea className="p-4 space-y-4">
          {messages.map((message, index) => (
            message.type === 'user'
              ? <div className="flex items-end" key={index}>
                  <Avatar className="order-1 w-12 h-12 mt-3 inline-flex justify-center items-center rounded-full bg-gray-200 text-gray-500">
                    U
                  </Avatar>
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600 text-base">
                        {message.text}
                      </span>
                    </div>
                  </div>
                </div>
              : <div className="flex items-end justify-end" key={index}>
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white text-base">
                        {message.text}
                      </span>
                    </div>
                  </div>
                  <Avatar className="order-1 w-12 h-12 mt-3 inline-flex justify-center items-center rounded-full bg-blue-500 text-white">
                    AI
                  </Avatar>
                </div>
          ))}
        </ScrollArea> 
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-4 fixed bottom-0 w-full bg-gray-100">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <Button className="rounded-full" size="icon" variant="ghost">
              <SmileIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </Button>
          </span>
          <Input
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
            onKeyPress={handleKeyPress}
            value={currentInput}
            onChange={handleInputChange}
            placeholder="Ask something..."
            type="text"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <Button onClick={handleSendClick} className="rounded-full" size="icon" variant="ghost">
              <PlaneIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}


function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}


function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}

export default Chat
