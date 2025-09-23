import robotpfp from '../assets/robot.png'
import userpfp from '../assets/user.png'
import dayjs from 'dayjs'

export function ChatMessage(props) {
    const {message, sender} = props;
    const time = dayjs().valueOf();
    return (
      <div className={
        sender === 'user' 
          ? 'chat-message-user' 
          : 'chat-message-robot' 
      }>
        {sender === 'robot' && 
          (<img 
          className="chat-message-profile" 
          src={robotpfp} />)}
        <div className="chat-message-text">
          {message}
          <sub 
          className={
            sender === 'user' 
          ? 'timestamp-user' 
          : 'timestamp-robot' 
          }>{dayjs(time).format('HH:mm')}</sub>
        </div>
        {sender === 'user' && 
          (<img 
          className="chat-message-profile" 
          src={userpfp} />)}
      </div>
    );
  }