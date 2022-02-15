import { useCallback } from 'react';

import { io, Socket } from 'socket.io-client';

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
    sockets[myId] = io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`, {
      transports: ['websocket'],
    });
  }

  return [sockets[myId], disconnect];
};

export default useSocket;
