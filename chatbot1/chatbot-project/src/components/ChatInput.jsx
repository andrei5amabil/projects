import {useState} from 'react'
import {Chatbot} from 'supersimpledev'
import spinner from '../assets/loading-spinner.gif'

export function ChatInput( {chatMessages, setChatMessages} ) {
    const [inputText, setInputText] = useState('')
  
    function saveInputText(event) {
      setInputText(event.target.value);
    }
  
    async function sendMessage() {
  
      setInputText('');
  
      const newChatMessages = 
      [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID()
        }
      ];
  
      await setChatMessages(newChatMessages);
  
      const tempChatMessages = 
      [
        ...newChatMessages,
        {
          message: <img
            className="loading-spinner"
            src={spinner}
          />,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ];
  
      setChatMessages(tempChatMessages);
  
      //const response = Chatbot.getResponse(inputText);
      
      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]
      );
  
      
    }
  
    function enterMessage(event){
      if(event.key === 'Enter'){
        sendMessage();
      }
      if(event.key === 'Escape'){
        setInputText('');
      }
    }
  
    return (
      <div className="chat-input-container">
        <input 
          size="30" 
          placeholder="Send a message to Chatbot"
          onChange={saveInputText}
          onKeyDown={enterMessage}
          value={inputText}
          className="chat-input"
          />
        <button
          onClick={sendMessage}
          className="send-button"
        >Send</button>
        <button
          onClick={() => {
            setChatMessages([]);
            localStorage.removeItem('messages');
          }}
          className="clear-button"
        >Clear</button>
      </div>
        );
  }