import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  const { user1Id, user2Id } = req.body;

  try {
    let r = (Math.random() + 1).toString(36).substring(7);

    const createRooms= await prisma.room.create({data:{roomId:r}})
    console.log(createRooms);
    
    const room = await prisma.userRooms.create({
      data: {
        users: {
          connect: [
            { id: user1Id },
            { id: user2Id },
            
          ],
        },
        rooms:{
          connect:[
            {roomId: createRooms.roomId}
          ]
        }
      },
      include: {
        users: true,
        rooms:true,
      },
      
    });

    res.json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

export const getRoomsForUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const userRooms = await prisma.userRooms.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        rooms: {include: {Messages:{orderBy:{createdAt:"desc",},take:1,include:{sender:true}}}},
        users:{select:{userName:true,pdp:true,name:true,id:true}},
      },
    });
    const formattedData = userRooms.map((conversation) => {
      const room = conversation.rooms[0]; // Assuming each conversation has only one room
      const lastMessage = room.Messages.length > 0 ? room.Messages[room.Messages.length - 1] : null;
    
      const [user1, user2] = conversation.users.map((user) => ({
        id: user.id,
        userName: user.userName,
        pdp: user.pdp,
        name: user.name,
      }));
    
      return {
        conversationId: conversation.id,
        roomId: room.roomId,
        createdAt: room.createdAt,
        user1: user1,
        user2: user2,
        lastMessage: lastMessage
          ? {
              messageId: lastMessage.id,
              createdAt: lastMessage.createdAt,
              text: lastMessage.text,
              sender: {
                id: lastMessage.sender.id,
                name: lastMessage.sender.name,
                userName: lastMessage.sender.userName,
                pdp: lastMessage.sender.pdp,
              },
            }
          : null,
      };
    });
    
    console.log(formattedData);

    res.json(formattedData);
  } catch (error) {
    console.error('Error getting user rooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};



export const getMessagesForRoom = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;

  try {
    const messages = await prisma.messages.findMany({
      where: {
        roomId: roomId,
      },
      include: {
        sender: {select:{id:true,pdp:true,userName:true}},
        Room:true,
      },
    });

    res.json(messages);
  } catch (error) {
    console.error('Error getting messages for room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};



export const createMessage = async (req: Request, res: Response): Promise<void> => {
  const { userId, text, image,roomId } = req.body;

  try {
    // Create a new message
    const message = await prisma.messages.create({
      data: {
        text,
        image,
        userId,
        roomId,
      },
      include: {
        sender: true,
      },
    });

    res.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
