import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import generator from 'generate-password'; 
import uniqId from 'uniqid';
import macAddress from 'macaddress';
import bcrypt from 'bcryptjs';
import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';
import dotenv from  'dotenv';
import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import randomCode from 'randomstring';
import nodemailer from 'nodemailer';
import createErrors from 'http-errors';
import path from 'path';
import multer from 'multer';
import IBM from 'ibm-cos-sdk';
import multerS3 from 'multer-s3';
import session from 'express-session';


dotenv.config();
const salt = bcrypt.genSaltSync(10);


export const Joi = BaseJoi.extend(Extension);
export const passwordRegex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$@%&? "]).*$/;
export const hashPassword = password => bcrypt.hashSync(password, salt);
export const passwordCompare = (password,hash) => bcrypt.compareSync(password, hash); 
export const mac_address = () => macAddress.one( (err, mac) =>mac);
export const generatePassword = () => generator.generate({
    length: 80,
    numbers: true,
    uppercase: true,
    symbols:true,

});
export const generateCode = () => randomCode.generate({
    length: 7,
    charset: 'numeric'
});
export const midParse = bodyParser.urlencoded({ extended: true });
export {express,bodyParser,logger,cors,uniqId,Sequelize,jwt,
    nodemailer,createErrors,path,multer,IBM,multerS3,session}

