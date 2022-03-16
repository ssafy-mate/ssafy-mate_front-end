import { AxiosResponse } from 'axios';

import { useDispatch } from 'react-redux';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';

import { ChatLogResponseType, MessageType } from '../../types/messageTypes';
import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';

import ChatService from '../../services/ChatService';

const useSendChat = (
  roomId: string | null,
  userId: number,
  setChat: React.Dispatch<React.SetStateAction<string>>,
  handleScroll: void,
) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const showAlert = (alertShow: boolean, alertText: string) => {
    dispatch(
      showSsafyMateAlertSagaStart({
        show: alertShow,
        text: alertText,
      }),
    );
  };

  const queryFn = (params: MessageType) => ChatService.sendChatData(params);

  const mutation = useMutation(['roomId', roomId], queryFn, {
    onMutate(mutateData) {
      queryClient.setQueryData<
        InfiniteData<AxiosResponse<ChatLogResponseType>>
      >(['roomId', roomId], (data) => {
        const newPages = data?.pages.slice() || [];
        const newIndex = newPages[0].data.contentList[0].id;

        newPages[0].data.contentList.unshift({
          id: newIndex + 1,
          userName: mutateData.userName,
          roomId: mutateData.roomId,
          content: mutateData.content,
          senderId: mutateData.senderId,
          sentTime: mutateData.sentTime,
        });

        setChat('');
        // handleScroll();

        return {
          pageParams: data?.pageParams || [],
          pages: newPages,
        };
      });
    },
    onError() {
      showAlert(true, '채팅 보내기에 실패했습니다. 다시 시도해주세요.');
    },

    onSuccess() {
      queryClient.refetchQueries(['roomId', roomId]);
      queryClient.refetchQueries(['userId', userId]);
    },
  });

  return mutation;
};

export default useSendChat;
