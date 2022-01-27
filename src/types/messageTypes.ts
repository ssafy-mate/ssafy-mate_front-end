export interface MessageType {
  senderId: number;
  roomId: string;
  content: string;
  sentTime: string;
  type: string;
}

export interface ChatRoomType {
  roomId: string;
  userId: number;
  userName: string;
  profileImgUrl: string;
  content: string;
  sentTime: string;
}
