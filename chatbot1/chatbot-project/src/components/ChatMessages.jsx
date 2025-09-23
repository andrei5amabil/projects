import {ChatMessage} from './ChatMessage.jsx'
import React from 'react'



function useAutoScroll(dependencies) {
  const chatMessagesRef = React.useRef(null);

  React.useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if( containerElem ){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return chatMessagesRef;
}

export function ChatMessages({chatMessages}) {

  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div 
    className="chat-messages-container"
    ref={chatMessagesRef}>
      {
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage 
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          )
        })
      }
    </div>
  );
}
