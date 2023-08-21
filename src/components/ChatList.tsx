import React,{ useState} from 'react';
import { Chats } from '../types';
import { maxTitleLength } from '../config';
import { faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons';
import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ChatListProps{
    chatList:Chats[],
    setChats:any,
    showArchivedChats:boolean,
    setShowArchivedChats:any
}


const ChatList:React.FC<ChatListProps>=({chatList,setChats, showArchivedChats,setShowArchivedChats})=> {

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

    const handleArchiveToggle = (chat:Chats)=>{
        const archiveChats = chatList.map((chats) =>
        chats.chatId === chat.chatId ? { ...chats, isArchived: !chats.isArchived } : chats
         );
         setChats(archiveChats);
    }

    const handleClose=()=>{
        setShowArchivedChats(!showArchivedChats)
    }

  return (
    <div className="chat-container">
    <div className="chat-list-container">
        <div className='chat-list-heading'>
           {showArchivedChats ? 'Archived':'Messaging'}
           {showArchivedChats? (
            <div className='chat-list-close' onClick={()=>handleClose()}> 
            <FontAwesomeIcon icon={faXmark} />
            </div>
           ):null}
        </div>
        {chatList.filter((c)=>c.isArchived===showArchivedChats).map((chat:Chats, index:number) => (
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
                <div className='chat-archive'>
                    <button className='chat-archive-button' onClick={()=>handleArchiveToggle(chat)}>
                    {chat.isArchived ? 'Unarchive' : 'Archive'}
                    </button>
                    </div>
            </div>
        ))}
    </div>
    <div className="chat-active-container">
        {activeChat !== null && (
            <div className="chat-active-heading"> {
                chatList
                .filter((c) => c.isArchived === showArchivedChats)[activeChat]?.members[0]?.firstname}</div>
        )}
    </div>
</div>
  )
}

export default ChatList