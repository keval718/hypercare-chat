import React,{useState} from 'react';
import { Chats } from '../types';
import { maxTitleLength } from '../config';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ChatListProps{
    chatList:Chats[]
}

const ChatList:React.FC<ChatListProps>=({chatList})=> {

    const [activeChat, setActiveChat] = useState<number |null>(null);

    const getTimeStamp = (time:string) => {
        const date = new Date(time);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        let timestamp = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours > 12 ? 'PM' : 'AM'}`;
        return timestamp
    }

    const formatChatTitle = (chat:Chats) => {
        let chatTitle;
        if (!chat.title) {
            const memberNames = chat.members.map((member: { firstname: string; }) => member.firstname).join(", ");
            chatTitle = memberNames;
        } else {
            chatTitle = chat.title;
        }
        if (chatTitle.length > maxTitleLength) {
            const remainingUsers = chat.members.length - 1;
            return `${chatTitle.split(",")[0].trim()} + ${remainingUsers} people`;
        }
        return chatTitle;
    };


  return (
    <div className="chat-container">
    <div className="chat-list-container">
        <div className='chat-list-heading'>
            Messaging
        </div>
        {chatList.map((chat:Chats, index:number) => (
            <div
                key={chat.chatId}
                className={`chat-items ${activeChat === index ? 'active' : ''}`}
                onClick={() => setActiveChat(index)}
            >
                <div className="chat-avatar">
                    {chat.lastMessage.sender.profilePic}
                    <div className='chat-avatar-icon'>
                       {chat.type==='group'?(<FontAwesomeIcon icon={faUserGroup}/>):(null)} 
                        </div>
                    </div>
                <div className="chat-details">
                    <div className="chat-title">{formatChatTitle(chat)}</div>
                    <div className="chat-message">
                        {chat.lastMessage.sender.id === 'self' ? 'Me: ' : `${chat.lastMessage.sender.firstname}: `}
                        {chat.lastMessage.message.length > 10 ? (chat.lastMessage.message.substring(0, 5)) + '...' : chat.lastMessage.message}
                    </div>
                </div>
                <div className="chat-timestamp">{getTimeStamp(chat.lastMessage.dateCreated)}</div>
            </div>
        ))}
    </div>
    <div className="chat-active-container">
        {activeChat !== null && (
            <div className="chat-active-heading">{chatList[activeChat]?.title || chatList[activeChat].members[0].firstname}</div>
        )}
    </div>
</div>
  )
}

export default ChatList