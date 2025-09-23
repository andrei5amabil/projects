export function WelocomeMessage({chatMessages}){

  const welcome = 'Welcome to the chatbot project! Send a message using the textbox below.';

  return (
    <p className="welcome-message">
      { chatMessages.length === 0 ? welcome : '' }
    </p>
  );

}