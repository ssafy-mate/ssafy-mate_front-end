import { useCallback } from 'react';

import { io, Socket } from 'socket.io-client';

const backUrl = 'https://i6a402.p.ssafy.io:3100';

const sockets: { [key: number]: Socket } = {};

const useSocket = (myId?: number): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (myId && sockets[myId]) {
      sockets[myId].disconnect();
      delete sockets[myId];
    }
  }, [myId]);

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
