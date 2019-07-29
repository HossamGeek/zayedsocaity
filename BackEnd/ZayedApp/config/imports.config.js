import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import generator from 'generate-password'; 
import uniqId from 'uniqid';
import macAddress from 'macaddress';
import bcrypt from 'bcryptjs';
import Joi from '@hapi/joi';
import dotenv from  'dotenv';
import Sequelize from 'sequelize';

dotenv.config();
const salt = bcrypt.genSaltSync(10);


export const hashPassword = password => bcrypt.hashSync(password, salt);
export const passwordCompare = (password,hash) => bcrypt.compareSync(password, hash); 
export const mac_address = () => macAddress.one( (err, mac) =>mac);
export const generatePassword = generator.generate({
    length: 80,
    numbers: true,
    uppercase: true,
    symbols:true,

});
export const midParse = bodyParser.urlencoded({ extended: true });
export {express,bodyParser,logger,cors,uniqId,Joi,Sequelize}

