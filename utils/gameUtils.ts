import { SocketEnums } from "@/constants/socketConstants";
import { Chess } from "chess.js";
import { getCookie } from "./cookieUtils";

export const retrieveBoardFromMessages = (list: any[]) => {
  let result = new Chess().fen();
  list.filter(({ type, data }) => {
    return type === SocketEnums.RESPONSE_TO_CLIENT && !!data.board;
  });

  if (list.length > 0) {
    result = list[list.length - 1].data.board;
  }

  return result;
};

export const getBoardOrientation = (): "black" | "white" => {
  const user_id = getCookie("user_id");
  if (!user_id) return "white";

  try {
    const { player1, player2 } = JSON.parse(
      getCookie("active-game-metadata") ?? "{}"
    );

    switch (user_id) {
      case player1:
        return "white";
      case player2:
        return "black";
    }
  } catch (ex) {
    console.log("Error: ", ex);
  }
  return "white";
};

export const getRoomIdFromCookie = (): string => {
  const { room_id } = JSON.parse(getCookie("active-game-metadata") ?? "{}");
  return room_id;
};
