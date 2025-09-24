import './App.css'
import React from 'react'
import {ChatInput} from './components/ChatInput.jsx'
import {WelocomeMessage} from './components/WelcomeMessage.jsx'
import {ChatMessages} from './components/ChatMessages.jsx'
import { Chatbot } from 'supersimpledev'

function App() {
  React.useEffect(() => {
    Chatbot.addResponses({
      'what\'s 9 + 10?': '21',
      'tell me a joke': 'Why did the cucumber call 911? Because it was in a pickle!',
      'good boy': 'SYBAU',
    });
  }, []);

  const [chatMessages, setChatMessages] = React.useState(
      JSON.parse(localStorage.getItem('messages')) || []
  );

  React.useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);
  
  return (
    <div className="app-container">
    
    <ChatMessages
      chatMessages={chatMessages}
    />

    <WelocomeMessage
      chatMessages={chatMessages}
    />
    
    <ChatInput 
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
    </div>
  );
}

export default App
