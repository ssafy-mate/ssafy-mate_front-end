import { AxiosError, AxiosResponse } from 'axios';

import { useInfiniteQuery } from 'react-query';

import { ErrorResponse } from '../../types/commonTypes';
import { ChatLogResponseType } from '../../types/messageTypes';

import ChatService from '../../services/ChatService';

const useChatLog = (token: string | null, roomId: string | null) => {
  const queryFn = ({ pageParam = -1 }) =>
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
    getNextPageParam: (lastPage) => {
      if (lastPage.data.nextCursor !== 0) {
        return lastPage.data.nextCursor;
      } else {
        return undefined;
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
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
