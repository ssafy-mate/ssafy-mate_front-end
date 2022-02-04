export interface MessageRequestType {
  senderId: number;
  roomId: string;
  content: string;
  sentTime: string;
}

export interface ChatRoomResponseType {
  roomId: string;
  userId: number;
  userName: string;
  profileImgUrl: string;
  content: string;
  sentTime: string;
}

export interface ChatRoomListRequestType {
  roomList: ChatRoomResponseType[];
}

export interface ChatLogResponseType {
  contentList: ChatLogContentType[];
  totalPage?: number;
}

export interface ChatLogContentType {
  id: number;
  content: string;
  userName: string;
  sentTime: string;
  senderId: number;
}

export interface ChatRoomTypeProps extends ChatRoomResponseType {}
