export interface Chats {
    chatId: string;
    title: string;
    type: string;
    members: ChatMember[];
    lastMessage: Message;
    muted: boolean;
    status: string;
    dateCreated: string;
    isArchived: boolean;
    unreadPriorityMessages: number;
  }
  
  interface ChatMember {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    role: string;
    profilePic: {
      url: string;
    };
    status: string;
    privilege: string;
    workStatus: string;
    statusExpiryDate: string;
    statusDescription: string;
    workStatusProxy: PublicUserStatusFields;
  }
  
  interface Message {
    id: string;
    priority: string;
    message: string;
    image: string;
    type: string;
    dateCreated: string;
    sender: PublicUserFields;
    readBy: ReadReceiptFields[];
    data: {};
  }
  
  interface ReadReceiptFields {
    messageId: string;
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
    profilePic: {
      url: string;
    };
  }
  