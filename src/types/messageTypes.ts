export interface MessageType {
  senderId: bigint;
  roomId: string;
  content: string;
  sentTime: string;
  userName: string;
}

export interface ChatRoomResponseType {
  roomId: string;
  userId: bigint;
  userName: string;
  profileImgUrl: string;
  content: string;
  sentTime: string;
}

export interface ChatRoomListResponseType {
  roomList: ChatRoomResponseType[];
}

export interface ChatLogResponseType {
  contentList: MessageType[];
  totalPage?: number;
}

export interface ChatRoomTypeProps extends ChatRoomResponseType {}
