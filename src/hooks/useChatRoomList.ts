import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { ErrorResponse } from '../types/commonTypes';
import { ChatRoomType } from '../types/messageTypes';

import ChatService from '../services/ChatService';

const useChatRoomList = (token: string | null, myUserId: number) => {
  const queryFn = () => ChatService.getChatRoomList(token, myUserId);
  const { isLoading, data, refetch, isError, error } = useQuery<
    AxiosResponse<ChatRoomType[]>,
    AxiosError<ErrorResponse>
  >(['userId', myUserId], queryFn, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    roomData: data?.data,
    refetch,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useChatRoomList;
