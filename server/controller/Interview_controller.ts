import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const nodemailer = require("nodemailer");
const prisma = new PrismaClient();


export const getInterview = async (req: Request, res: Response) => {
  const { receiver } = req.params;
  try {
    const result = await prisma.interviewRequest.findMany({
      where: { receiver },
      include : {
        from : true,
        to : true
      }
      ,
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getYourInterview = async (req : Request , res : Response) => {
  const {sender} = req.params
  try {
    const result = await prisma.interviewRequest.findMany({
      where : {sender},
      include : {
        to : true,
        from : true
      }
    })
    res.status(200).send(result)
  }catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
}

export const updateInterview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    const result = await prisma.interviewRequest.updateMany({
      where: { id },
      data: {
        state,
      },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const deleteInterviewCompany = async (req: Request, res: Response) => {
  const { receiver } = req.params;
  try {
    const result = await prisma.interviewRequest.deleteMany({
      where: { receiver },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const deleteInterviewStudent = async (req: Request, res: Response) => {
  const { receiver } = req.params;
  try {
    const result = await prisma.interviewRequest.deleteMany({
      where: { receiver },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const sendEmailCompany = async (req: Request, res: Response) => {
    const { companyId, studentId } = req.params;
    try {
      const company = await prisma.user.findFirst({
        where: { id: companyId },
      });
  
      const student = await prisma.user.findFirst({
        where: { id: studentId },
      });
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "haddadaahmed9@gmail.com",
          pass: "wlpd vkxo mkfz cztg",
        },
      });
      let info = await transporter.sendMail({
        from: company?.email,
        to: student?.email,
        subject: "Regarding your Project",
        text: `Dear ${student?.name},
  
                  Isekai is here to inform you that ${company?.name} is interested in your projects and ideas that you present in your Profile.`,
        html: `
                  <body
                  style="
                  font-family: 'Arial', sans-serif;
                  background-color: #ffffff;
                  margin: 0;
                  padding: 0;
                  "
                  >
                  <div
                  style="
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  "
                  >
                  <div style="text-align: center; margin-bottom: 20px">
                  <img
                  src="https://i.imgur.com/KyAazUD.png"
                  alt="Your Logo"
                  style="max-width: 100%; height: auto"
                  />
                  </div>
                  
                  <div style="text-align: center">
                  <h2 style="color : #674188; ">Congratulation!</h2>
                  
                  <p style : "font-size : 30px; ">
                  ${company?.name} is reaching out today because they're incredibly impressed with your amazing skills and creativity, showcased in projects. Your work demonstrates a clear commitement and your vast knowledge, which qualities we highly value at ${company?.name}.
                  They're very excited to be able to talk with you soon.<br>
                  <br>
                  from ${company?.name}
                  </p>
                  
                  
                  
                  </div>
                  </div>
                  </body>
                  `,
      });
      res.status(200).send('email sent');
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  };


  export const sendEmailStudent = async (req: Request, res: Response) => {
    const { companyId, studentId } = req.params;
    try {
      const company = await prisma.user.findFirst({
        where: { id: companyId },
      });
  
      const student = await prisma.user.findFirst({
        where: { id: studentId },
      });
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "haddadaahmed9@gmail.com",
          pass: "wlpd vkxo mkfz cztg",
        },
      });
      let info = await transporter.sendMail({
        from: company?.email,
        to: student?.email,
        subject: "Regarding your Project",
        text: `Dear ${student?.name},
  
                  Isekai is here to inform you that ${student?.name} is interested in your Company ${company?.name} and would like to show you their project.`,
        html: `
                  <body
                  style="
                  font-family: 'Arial', sans-serif;
                  background-color: #ffffff;
                  margin: 0;
                  padding: 0;
                  "
                  >
                  <div
                  style="
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  "
                  >
                  <div style="text-align: center; margin-bottom: 20px">
                  <img
                  src="https://i.imgur.com/KyAazUD.png"
                  alt="Your Logo"
                  style="max-width: 100%; height: auto"
                  />
                  </div>
                  
                  <div style="text-align: center">
                  <h2 style="color : #674188; ">Congratulation!</h2>
                  
                  <p style : "font-size : 30px; ">
                  ${student?.name} is reaching out today because they're incredibly impressed with your prestige and reputation, showcased in your works. They are willing to share with you their idea/Project that in their opinion think it would work best with you. 
                   They are very excited to talk with you about their Project.<br>
                  <br>
                  from ${student?.name}
                  </p>
                  
                  
                  
                  </div>
                  </div>
                  </body>
                  `,
      });
      res.status(200).send('email sent');
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  };
