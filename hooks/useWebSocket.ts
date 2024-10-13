import { SocketEnums } from "@/constants/socketConstants";
import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useWebSocket = (url?: string) => {
  const socketRef = useRef<null | { current: Socket }>(null);
  const [latestMoveMessage, setLatestMoveMessage] = useState<object | null>(
    null
  );
  const [socketMessages, setSocketMessages] = useState<object[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const initSocket = () => {
    if (socketRef?.current) {
      return;
    }

    const wsUrl = process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL;

    const socket = io(wsUrl);

    socketRef.current = socket;

    socket.on(SocketEnums.CONNECTION, () => {
      setIsConnected(true);
    });

    socket.on(SocketEnums.RESPONSE_TO_ALL_CLIENTS, (data) => {
      setSocketMessages((prev: object[]) => [
        ...prev,
        { data, type: SocketEnums.RESPONSE_TO_ALL_CLIENTS },
      ]);
    });

    socket.on(SocketEnums.GAME_MOVE_FROM_SERVER, (data) => {
      console.log("move from server => ", data);
      setLatestMoveMessage(data);
      setSocketMessages((prev: object[]) => [
        ...prev,
        { data, type: SocketEnums.GAME_MOVE_FROM_SERVER },
      ]);
    });

    socket.on(SocketEnums.RESPONSE_TO_CLIENT, (data: any) => {
      setSocketMessages((prev: object[]) => [
        ...prev,
        { data, type: SocketEnums.RESPONSE_TO_CLIENT },
      ]);
    });

    socket.on(SocketEnums.RESPONSE_TO_ALL_CLIENTS, (data: any) => {
      setSocketMessages((prev: object[]) => [
        ...prev,
        { data, type: SocketEnums.RESPONSE_TO_ALL_CLIENTS },
      ]);
    });
  };

  const disconnectSocket = (): void => {
    if (socketRef?.current && isConnected) {
      socketRef?.current.on(SocketEnums.DISCONNECT, () => {
        setIsConnected(false);
        socketRef.current = null;
      });
    }
  };

  const sendMessage = async (messageEnum: string, data: object): void => {
    if (socketRef?.current && isConnected) {
      try {
        await socketRef?.current.emit(messageEnum, data);
      } catch (ex) {
        console.log("Error: ", ex);
      }
    }
  };

  const socketFunctions = {
    disconnectSocket,
    initSocket,
    sendMessage,
  };

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  return { socketMessages, latestMoveMessage, isConnected, socketFunctions };
};

export default useWebSocket;
