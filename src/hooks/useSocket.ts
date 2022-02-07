import { useCallback } from 'react';

import { io, Socket } from 'socket.io-client';

const backUrl = 'http://localhost:3095';

const useSocket = (roomId: string): [Socket | undefined, () => void] => {
  const socket = io(`${backUrl}/dm-${roomId}`, { transports: ['websocket'] });

  const disconnect = useCallback(() => {
    socket.disconnect();
  }, []);

  if (!socket) {
    return [undefined, disconnect];
  }

  return [socket, disconnect];
};

export default useSocket;
