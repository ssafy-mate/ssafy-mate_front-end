import { axiosInstance, axiosSocketInstance } from '../utils/axios';
import { MessageType } from '../types/messageTypes';

class ChatService {
  public static async getChatUserInfo(userId: string) {
    const response = await axiosInstance.get(`api/chats/infos/${userId}`);
    return response;
  }

  public static async sendChatData(params: MessageType) {
    const response = await axiosSocketInstance.post(`/api/chats`, params);
    return response;
  }

  public static async getChatRoomList(token: string | null, userId: number) {
    const response = await axiosInstance.get(`/api/chats/rooms/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
}

export default ChatService;
