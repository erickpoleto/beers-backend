const mongoose = require("mongoose")

const User = require("../models/UsersModel");
const Token = require("../modules/token")
const crypto = require('crypto');
const mailer = require('../modules/mailer')

module.exports = {
    async index(req, res) {
        const users = await User.find();
        return res.json(users);
        
    },
    async create(req, res) {
        const { email } = req.body
        try{
            if(await User.findOne({"email":email})){
                return res.status(400).send({error: "email already in use"})
            }
            const user = await User.create(req.body);
            user.password = undefined
            
            const token = crypto.randomBytes(20).toString('hex');
            await User.findByIdAndUpdate(user.id, {$set: {
                confirmToken: token,
            }})
            await mailer.sendMail({
                to: email,
                from: 'erick-poleto@hotmail.com',
                template: '/confirmEmail',
                context: {token, email}
            }, err => {
                if(err){
                    console.info(err)
                    return res.status(400).send({error: 'cannot send email'})
                }
                return res.send({done: "check your mailbox to confirm"});
            })
            return res.send({user, token: Token.token({id: user.id})});
        }catch(e){
            console.info(e)
            return res.status(400).send({error: "registration failed"});
        }
    },
    async checkConfirmation(req, res) {
        const {token, email} = req.query;
        try{
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).send({error: "invalid user"});
            }
            if(user.confirmed == true){
                return res.status(400).send({error:"user already confirmed"});
            }
            if(token == undefined){
                return res.status(400).send({error:"no token defined"});
            }
            if(user.confirmToken == token){
                const confirm = await User.findByIdAndUpdate(user.id, {$set: {
                    confirmed: true,
                }})   
                return res.status(200).send({done: "confirmation done"});
            }
        }catch(e){
            console.info(e)
            return res.status(400).send("some error occured")
        }
    },
    async delete(req, res) {
        await User.deleteMany({})
        return res.json()
    }
};