import { useCallback } from 'react';

import { io, Socket } from 'socket.io-client';

const backUrl = 'http://localhost:3095';

const sockets: { [key: number]: Socket } = {};

const useSocket = (myId?: number): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (myId && sockets[myId]) {
      sockets[myId].disconnect();
      delete sockets[myId];
    }
  }, [myId]);

  // namespace - room 을 구분해야함
  if (!myId) {
    return [undefined, disconnect];
  }

  if (!sockets[myId]) {
    sockets[myId] = io(`${backUrl}`, {
      transports: ['websocket'],
    });
  }

  return [sockets[myId], disconnect];
};

export default useSocket;
