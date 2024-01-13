import express from "express";
export const chatRoutes = express.Router();
import {createRoom,getRoomsForUser,createMessage,getMessagesForRoom} from "../controller/Chat_controller";

chatRoutes.post('/room/create',createRoom)
chatRoutes.get('/room/get/:userId',getRoomsForUser)
chatRoutes.get('/room/messages/get/:roomId',getMessagesForRoom)
chatRoutes.post('/room/messages/post',createMessage)