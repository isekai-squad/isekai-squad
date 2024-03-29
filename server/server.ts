import express from "express";
import cors from "cors";
import { config } from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
config();

import { userRoutes } from "./router/user_router";
import postsRoute from "./router/Posts_route";
import servicesRoute from "./router/Services_route";
import reportsRoute from "./router/Reports_route";
import technoRoute from "./router/Technologies_route";

const app = express();
app.use(cors());
app.use(express.json());

// ===================================Ahmed==============================
// import Routes
import forumPost from "./router/forum_post_route";
import forumComment from "./router/forum_comment_route";
import notification from "./router/notification_route";
import payment from "./router/Payment_route";

app.use("/forumPost", forumPost);
app.use("/forumComment", forumComment);
app.use("/notification", notification);
app.use("/payment", payment);
// // ===================================Ahmed==============================

// //===============================Adam====================================
import { chatRoutes } from "./router/chat_route";
app.use("/api", userRoutes);
app.use("/technologie", technoRoute);
app.use("/chat", chatRoutes);
// //===============================Adam=====================================
// //===============================Ameur====================================

import favotitRouter from "./router/favorite_route";
import basket from "./router/basket_route";
import Baybaskets from "./router/basket_route";

app.use("/favorit", favotitRouter);
app.use("/baskets", basket);
app .use("/Baybaskets",Baybaskets)

//===============================Ameur=====================================
//===============================Hasan====================================
app.use('/Posts' , postsRoute);
app.use('/Services', servicesRoute);
app.use('/Reports' , reportsRoute)
import technologiesRoute from "./router/Technologies_route"
import postsCommentsRoute from "./router/PostsComment_route"
app.use('/Expertise', technologiesRoute);
app.use('/Comments', postsCommentsRoute);
import CategoryRoute from './router/Category_route'
app.use('/Category', CategoryRoute)
import interviewRoute from './router/Interview_route'
app.use('/Interviews', interviewRoute)
//===============================Hasan=====================================

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server);
const prisma = new PrismaClient();

io.on('connection', (socket) => {
  console.log('a user connected');
  
  const userNotifications : any = {}
  // socket.on('userConnected', ((user) => {
  //   const {id} = user
  //     console.log(user)
  //     userNotifications[id] = 0
  //   }))
    
    socket.on('message', async (data) => {
      const { roomId, text, userId } = data;
      const message = await prisma.messages.create({
        data: {
          text,
          userId,
          roomId,
        },
      });
      
      // Emit the new message to the room
      io.to(roomId).emit('newMessage', message);
    });
    
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });
    
    
    
    socket.on('sendNotification' ,async ({sender , receiver , content , type , postId}) => {
       await prisma.notifications.create({
        data: {
          from : sender,
          to : receiver,
          content,
          type,
          postId
        },
      });
      // userNotifications[receiver] = 0
      // console.log(notification)
      const notifications = await prisma.notifications.count({
        where : {
          to : receiver,
          seen : false
        }
      })
      io.to(receiver).emit('newNotification', {notifications , receiver});
      console.log(sender , 'sender')
      console.log(receiver , "receiver")
       io.emit('updateNotification', {receiver , count : notifications});
    }) 
    

  socket.on('offer', (data) => {
    // Broadcast the offer to the recipient
    io.to(data.target).emit('offer', data);
  });
  socket.on('answer', (data) => {
    io.to(data.target).emit('answer', data);
  });

  socket.on('reject', (data) => {
    io.to(data.target).emit('reject', data);
  });

  socket.on('ice-candidate', (data) => {
    io.to(data.target).emit('ice-candidate', data);
  });

  socket.on('sendRequest' , async ({sender , receiver , message}) => {
    await prisma.interviewRequest.create({
      data: {
        sender,
        receiver,
        message
      },
    });
    const requests = await prisma.interviewRequest.count({
      where : {
        receiver,
        state : "Pending"
      }
    });
    io.to(receiver).emit('NewRequest', {requests, receiver})
    io.emit('updateRequest', {receiver, count : requests})
  })
  
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("newMessage", () => socket.emit("newMessage"));
});


server.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
