import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const nodemailer = require('nodemailer')
const prisma = new PrismaClient();


export const addInterview = async (req : Request , res : Response) => {
    const {studentId , companyId} = req.params;
    const {message} = req.body
    try {
        const result = await prisma.interviewRequest.create({
            data: {
                studentId: studentId,
                companyId: companyId,
                message: message
            }
        })
        res.status(201).send(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getInterviewStudent = async (req : Request , res : Response) => {
    const {studentId} = req.params
    try {
        const result = await prisma.interviewRequest.findMany({
            where: {studentId}
        })
        res.status(200).send(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getInterviewCompany = async (req : Request , res : Response) => {
    const  {companyId} = req.params
    try {
        const result = await prisma.interviewRequest.findMany({
            where: {companyId}
        })
        res.status(200).send(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

}

export const updateInterviewCompany = async (req : Request , res : Response) => {
    const {companyId} = req.params
    const {state} = req.body
    try {
        const result = await prisma.interviewRequest.updateMany({
            where : {companyId},
            data: {
                state
            }
        })
        res.status(200).send(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}


export const deleteInterviewCompany = async (req : Request , res : Response) => {
    const {companyId} = req.params
    try {
        const result = await prisma.interviewRequest.deleteMany({
            where : {companyId}
        })
        res.status(200).send(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const deleteInterviewStudent = async (req : Request, res : Response) => {
    const {studentId} = req.params
    try {
        const result = await prisma.interviewRequest.deleteMany({
            where : {studentId}
        })
        res.status(200).send(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const sendEmail = async (req : Request, res : Response) => {
    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth:{
                user: 'hasanBouhlel@gmail.com',
                pass: 'password_for_your_email_address'
            }
        }
    );

}