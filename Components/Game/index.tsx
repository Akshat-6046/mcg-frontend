"use client";

import { SocketEnums } from "@/constants/socketConstants";
import {
  getBoardOrientation,
  getRoomIdFromCookie,
  retrieveBoardFromMessages,
} from "@/utils/gameUtils";
import React, { useEffect, useOptimistic, useState } from "react";
import { Container, GameContainer, OpponentInfo, PlayerInfo } from "./styles";
import { Chessboard } from "react-chessboard";
import {
  Piece,
  PromotionPieceOption,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { Chess, PieceType } from "chess.js";
import { ChessStatusEnum } from "@/constants/gameStatusConstants";

interface Props {
  messages: object[];
  latestMoveMessage: object | null;
  sendMessage: (type: SocketEnums, data: object) => Promise<void>;
}

const Game = ({ messages, sendMessage, latestMoveMessage }: Props) => {
  const [chess] = useState(new Chess(retrieveBoardFromMessages(messages)));
  const [board, setBoard] = useState(chess.fen());
  const [optimisticBoard, updateOptimisticBoard] = useOptimistic(board);

  const boardOrientation = getBoardOrientation();
  const room_id = getRoomIdFromCookie();

  const handleSendGameMove = async ({
    from,
    to,
    promotion,
  }: {
    from: string;
    to: string;
    promotion?: string;
  }) => {
    await sendMessage(SocketEnums.GAME_MOVE, {
      move: {
        from,
        to,
        promotion,
      },
      room_id,
    });
  };

  const handlePawnPromotion = async (
    piece: PromotionPieceOption,
    source: Square,
    destination: Square
  ): Promise<boolean> => {
    await handlePieceDrop(source, destination, null, piece);
    return true;
  };

  async function handlePieceDrop(
    sourceSquare: Square,
    destinationSquare: Square,
    _: Piece,
    promotionPiece?: Exclude<PieceType, "p" | "k"> | undefined
  ): Promise<boolean> {
    if (!isPlayerTurn()) {
      return false;
    }

    const promotion =
      promotionPiece &&
      promotionPiece?.[1] &&
      promotionPiece[1].toLowerCase() !== "p" &&
      promotionPiece[1].toLowerCase() !== "k"
        ? promotionPiece[1].toLowerCase()
        : undefined;

    const move = chess.move({
      from: sourceSquare,
      to: destinationSquare,
      promotion,
    });

    if (move === null) {
      return false;
    }

    updateOptimisticBoard(chess.fen());
    setBoard(chess.fen());

    await handleSendGameMove({
      from: sourceSquare,
      to: destinationSquare,
      promotion,
    });

    return true;
  }
  const isPlayerTurn = (): boolean => {
    const turn = chess.turn();
    return boardOrientation === "white" ? turn === "w" : turn === "b";
  };

  useEffect(() => {
    if (latestMoveMessage) {
      if (latestMoveMessage.error === "Invalid move") {
        chess.undo();
      } else {
        chess.move(latestMoveMessage.move);
      }
      setBoard(chess.fen());
    }
  }, [latestMoveMessage]);

  return (
    <>
      <Container>
        <GameContainer>
          <OpponentInfo>Opponent</OpponentInfo>
          <Chessboard
            id="aihfierukfbaniselukfgahweoifuakbwefnpiaewu"
            boardWidth={200}
            boardOrientation={boardOrientation}
            position={optimisticBoard}
            onPieceDrop={handlePieceDrop}
            onPromotionPieceSelect={handlePawnPromotion}
            promotionDialogVariant={"modal"}
            autoPromoteToQueen={false}
            customBoardStyle={{
              boxShadow: `${
                isPlayerTurn() ? "var(--green-400)" : "#b8b8b8"
              } 0px 0px 14px 2px`,
              border: `${
                isPlayerTurn()
                  ? "4px solid var(--green-500)"
                  : "4px solid #f8f8f8"
              }`,
              borderRadius: "4px",
              width: "508px",
              height: "508px",
            }}
            customDarkSquareStyle={{ background: "var(--blue-500)" }}
            customLightSquareStyle={{ background: "var(--blue-300)" }}
            customNotationStyle={{
              fontWeight: "bold",
              color: "var(--gray-900)",
            }}
          />
          <PlayerInfo>Player</PlayerInfo>
        </GameContainer>
        {/* <GameInfoContainer>
        <Timer />
        <MovesContainer />
      </GameInfoContainer> */}
      </Container>
    </>
  );
};
export default Game;
