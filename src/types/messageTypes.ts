export interface MessageType {
  senderId: number;
  roomId: string;
  content: string;
  sentTime: string;
  userName: string;
}

export interface ChatRoomType {
  roomId: string;
  userId: number;
  userName: string;
  profileImgUrl: string;
  content: string;
  sentTime: string;
  userEmail: string;
}

export interface ChatRoomListResponseType {
  roomList: ChatRoomType[];
}

export interface ChatLogResponseType {
  contentList: MessageType[];
  totalPage?: number;
}

export interface ChatRoomTypeProps extends ChatRoomType {
  myId: number;
}
