import React,{useState,useEffect} from 'react';
import {accessToken,hypercareScope,baseURL, isPriority,limit} from '../../config';
import ChatList from '../../components/ChatList';
import axios from 'axios';
import { getChatsQuery } from '../../graphql/chatsQueries';
import { Chats } from '../../types';
import './Chat.css';


const Chat: React.FC= ()=> {
    const [chats,setChats]=useState<Chats[]>([]);
    const [error,setError]=useState<string>('');
    const [showArchivedChats, setShowArchivedChats] = useState<boolean>(false);


    useEffect(()=>{
        const fetchChatsData = async ()=>{
            const headers = {
                "hypercare-scope": hypercareScope,
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            }

          const variables={
            isPriority,
            limit
          }
    
          const data={
            query: getChatsQuery,
            variables
          }
          try {
                 const res = await axios.post(`${baseURL.hyperscopeURL}graphql/private`,JSON.stringify(data),{
                     headers:headers
                 })
                 if(res.status === 200){
                     const fetchedChats= res.data.data.chatsForOrganization.chats;
                     setChats(fetchedChats);
                 } else {
                    setError("Request Failed");
                 }
              } catch (error) {
            setError(error as string)
          }
        }
        fetchChatsData()
     },[]) 

     const sortedChatList = [...chats].slice()
     .sort((a: Chats, b: Chats) => {
      return new Date(b?.lastMessage?.dateCreated).getTime() - new Date(a?.lastMessage?.dateCreated).getTime();
    });

    const handleToggleButton=()=>{
      setShowArchivedChats(!showArchivedChats)
    }

  return (
    <div>
      {error ? <p>Error: {error}</p> :(
        <>
        <div className='archive-toggle'>
          <button className='archive-toggle-button' onClick={handleToggleButton}>
          {showArchivedChats ? 'Back to Messages' : 'Show Archived Chats'}
          </button>
          </div>
        <ChatList chatList={sortedChatList} setChats={setChats} showArchivedChats={showArchivedChats} setShowArchivedChats={setShowArchivedChats} />
        </>
      ) }
    </div>
  )
}

export default Chat;