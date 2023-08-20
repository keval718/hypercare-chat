import React,{useState} from 'react';
import './ChatList.css';

const ChatList=({chatList}:any)=> {

    const [activeChat, setActiveChat] = useState(null);

    const getTimeStamp = (time:any) => {
        const date = new Date(time);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        let timestamp = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours > 12 ? 'PM' : 'AM'}`;
        return timestamp
    }

    const formatChatTitle = (chat:any, maxTitleLength:any) => {
        let chatTitle;
        if (!chat.title) {
            const memberNames = chat.members.map((member: { firstname: any; }) => member.firstname).join(", ");
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
        {chatList.map((chat:any, index:any) => (
            <div
                key={chat.chatId}
                className={`chat-items ${activeChat === index ? 'active' : ''}`}
                onClick={() => setActiveChat(index)}
            >
                <div className="chat-avatar">{chat.lastMessage?.sender?.profilePic}</div>
                <div className="chat-details">
                    <div className="chat-title">{formatChatTitle(chat, 25)}</div>
                    <div className="chat-message">
                        {chat.lastMessage.sender.id === 'self' ? 'Me: ' : `${chat.lastMessage.sender.firstname}: `}
                        {chat.lastMessage.message.length > 10 ? (chat.lastMessage.message.substring(0, 25)) + '...' : chat.lastMessage.message}
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