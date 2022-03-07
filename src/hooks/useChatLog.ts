import { AxiosError, AxiosResponse } from 'axios';

import { useInfiniteQuery } from 'react-query';

import { ErrorResponse } from '../types/commonTypes';

import ChatService from '../services/ChatService';
import { ChatLogResponseType } from '../types/messageTypes';

const useChatLog = (token: string | null, roomId: string | null) => {
  const queryFn = ({ pageParam = 0 }) =>
    ChatService.getChatLog(token, roomId, pageParam);

  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<
    AxiosResponse<ChatLogResponseType>,
    AxiosError<ErrorResponse>
  >(['roomId', roomId], queryFn, {
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    isLoading,
    isError,
    data: data?.pages,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

export default useChatLog;
