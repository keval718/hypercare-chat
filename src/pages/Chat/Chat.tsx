import React,{useState,useEffect} from 'react';
import {accessToken,hypercareScope,baseURL, isPriority,limit} from '../../config';
import ChatList from '../../components/ChatList';
import axios from 'axios';
import { Chats } from '../../types';


const Chat: React.FC= ()=> {
    const [chats,setChats]=useState<Chats[]>([]);
    const [error,setError]=useState<string>('');

    useEffect(()=>{
        const fetchChats = async ()=>{
            const headers = {
                "hypercare-scope": hypercareScope,
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            }

            const query = `
            query organizationChats($continuationId: ID, $limit: Int, $isPriority: Boolean) {
              chatsForOrganization(continuationId: $continuationId, limit: $limit, isPriority: $isPriority) {
                chats {
                  ...basicChatFields
                  unreadPriorityMessages
                }
              }
            }
            
            fragment basicChatFields on Chat {
              chatId: id
              title
              type
              members {
                ...chatMemberFields
              }
              lastMessage {
                ...messageFields
              }
              muted
              status
              dateCreated
              isArchived
              unreadPriorityMessages
            }
            
            fragment chatMemberFields on ChatMember {
              id
              firstname
              lastname
              username
              role
              profilePic {
                url
              }
              status
              privilege
              workStatus
              statusExpiryDate
              statusDescription
              workStatusProxy {
                ...publicUserStatusFields
              }
            }
            
            fragment messageFields on Message {
              id
              priority
              message
              image
              type
              dateCreated
              sender {
                ...publicUserFields
              }
              readBy {
                ...readReceiptFields
              }
              data {
                __typename
                ... on ConsultMessageData {
                  mrn
                  firstname
                  lastname
                  details
                }
              }
            }
            
            fragment readReceiptFields on ReadReceipt {
              messageId
              user {
                ...publicUserFields
              }
              timestamp
            }
            
            fragment publicUserFields on PublicUser {
              id
              firstname
              lastname
              username
              role
              profilePic {
                url
              }
              workStatus
              statusDescription
              workStatusProxy {
                ...publicUserStatusFields
              }
            }
            
            fragment publicUserStatusFields on PublicUser {
              id
              firstname
              lastname
              username
              role
              profilePic {
                url
              }
            }
          `;
    
          const variables={
            isPriority,
            limit
          }
    
          const data={
            query,
            variables
          }
          try{
                 const res = await axios.post(`${baseURL.hyperscopeURL}graphql/private`,JSON.stringify(data),{
                     headers:headers
                 })
                 if(res.status===200){
                     const fetchedChats= res.data.data.chatsForOrganization.chats;
                     setChats(fetchedChats);
                 }
                 else
                 {
                    setError("Request Failed");
                 }
 
          }
          catch(error){
            setError(error as string)
          }
        }
    
        fetchChats()
    
     },[]) 

     const sortedChatList = [...chats].slice().sort((a: Chats, b: Chats) => {
      return new Date(b?.lastMessage?.dateCreated).getTime() - new Date(a?.lastMessage?.dateCreated).getTime();
    });

  return (
    <div>
      {error ? <p>Error: {error}</p> : <ChatList chatList={sortedChatList} />}
    </div>
  )
}

export default Chat;