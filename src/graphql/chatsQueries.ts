export const getChatsQuery = `
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