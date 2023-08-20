export interface Chats {
    chatId: string;
    dateCreated: string;
    isArchived: boolean;
    lastMessage: Message;
    members: ChatMember[];
    muted: boolean;
    status: string;
    title: string;
    type: string;
    unreadPriorityMessages: number;
  }

  interface Message {
    data: {};
    dateCreated: string;
    id: number;
    image: string;
    message: string;
    priority: string;
    readBy: ReadReceiptFields[];
    sender: PublicUserFields;
    type: string;
  }
  
  interface ChatMember {
    firstname: string;
    id: string;
    lastname: string;
    privilege: string;
    profilePic: string;
    role: string;
    status: string;
    statusExpiryDate: string;
    statusDescription: string;
    username: string;
    workStatus: string;
    workStatusProxy: PublicUserStatusFields;
  }
  interface ReadReceiptFields {
    messageId: number;
    user: PublicUserFields;
    timestamp: string;
  }
  
  interface PublicUserFields {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    role: string;
    profilePic: string;
    workStatus: string;
    statusDescription: string;
    workStatusProxy: PublicUserStatusFields;
  }
  
  interface PublicUserStatusFields {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    role: string;
    profilePic:string;
  }
  