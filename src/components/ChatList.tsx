import React,{useState,useEffect} from 'react';
import {accessToken,hypercareScope,baseURL, isPriority,limit} from '../config'
import './ChatList.css'

const ChatList=()=> {
    const [chats,setChats]=useState([]);
    const [activeChat,setActiveChat]=useState(null);
   
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
           
         }
         catch(error){
           console.log(error)
         }
       }
   
   
    },[])
  return (
    <div>ChatList</div>
  )
}

export default ChatList