import useWebSocket from "@/hooks/useWebSocket";
import { getCookie, setCookie } from "@/utils/cookieUtils";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import {
  Container,
  ChessContainer,
  Footer,
  StartButton,
  CancelButton,
} from "./styles";
import useRequest from "@/hooks/useRequest";
import { endpoints } from "@/constants/endpoints";
import { SocketEnums } from "@/constants/socketConstants";
import { toast } from "react-toastify";
import Game from "../Game";

const AppComponent = () => {
  const shouldCallInitialApis = () => {
    return !!getCookie("token");
  };

  const [gameState, setGameState] = useState("TO_START");
  const [isWaitingMode, setIsWaitingMode] = useState(false);
  const { refetch: fetch, loadingState, error, data } = useRequest();

  const {
    socketMessages,
    latestMoveMessage,
    isConnected,
    socketFunctions: { sendMessage, initSocket },
  } = useWebSocket();

  const handleStartButtonClick = (): void => {
    if (data && data.user_id) {
      sendMessage(SocketEnums.SEND_USER_DATA, {
        user_id: data.user_id,
      });
    }
  };

  const onSuccessProfileApi = (data: any) => {
    setCookie("user_id", data.user_id);
  };

  const handleCancelButtonClick = (): void => {
    if (data && data.user_id) {
      sendMessage(SocketEnums.DISCONNECTION, { user_id: data.user_id });
    }
  };

  useEffect(() => {
    if (shouldCallInitialApis()) {
      initSocket();
      fetch(endpoints.USER_PROFILE, {}, true, "GET", onSuccessProfileApi);
    }
  }, []);

  useEffect(() => {
    if (socketMessages.length > 0) {
      const { data, type } = socketMessages[socketMessages.length - 1];
      if (data === "Added to queue" || data === "Already in queue") {
        setIsWaitingMode(true);
      } else if (
        type === SocketEnums.RESPONSE_TO_CLIENT &&
        data?.message === "Removed from waiting queue"
      ) {
        setIsWaitingMode(false);
      } else if (
        (type === SocketEnums.RESPONSE_TO_ALL_CLIENTS ||
          type === SocketEnums.RESPONSE_TO_CLIENT) &&
        !!data.room_id
      ) {
        const { board, ...rest } = data;
        setIsWaitingMode(false);
        setGameState("IN_PROGRESS");
        setCookie("active-game-metadata", JSON.stringify(rest));
      }
    }
  }, [socketMessages]);

  const renderInitialUI = (): React.ReactElement => {
    const board = new Chess();
    return (
      <Container>
        <ChessContainer>
          <Chessboard
            customBoardStyle={{
              boxShadow: "#b8b8b8 0px 0px 14px 2px",
            }}
            customDarkSquareStyle={{ background: "var(--blue-500)" }}
            customLightSquareStyle={{ background: "var(--blue-300)" }}
            customNotationStyle={{
              fontWeight: "bold",
              color: "var(--gray-900)",
            }}
            position={board.fen()}
          />
        </ChessContainer>
        <Footer>
          {!isWaitingMode ? (
            <StartButton variant="outlined" onClick={handleStartButtonClick}>
              Play Game
            </StartButton>
          ) : (
            <CancelButton variant="outlined" onClick={handleCancelButtonClick}>
              Cancel
            </CancelButton>
          )}
        </Footer>
      </Container>
    );
  };

  const renderGameStateUI = (): React.ReactElement => {
    return (
      <Game
        messages={socketMessages}
        sendMessage={sendMessage}
        latestMoveMessage={latestMoveMessage}
      />
    );
  };

  const renderUIBasedOnConnection = (): React.ReactElement => {
    switch (gameState) {
      case "IN_PROGRESS":
        return renderGameStateUI();
      case "TO_START":
      default:
        return renderInitialUI();
    }
  };

  return renderUIBasedOnConnection();
};
export default AppComponent;
