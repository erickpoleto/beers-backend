const mongoose = require('mongoose')
const crypto = require('crypto');

const mailer = require('../modules/mailer')

const reSend = async (res, User,email) => {
        try{
            const token = crypto.randomBytes(20).toString('hex');
            await User.findByIdAndUpdate(User.id, {$set: {
                confirmToken: token,
            }})
            //send
            await mailer.sendMail({
                to: email,
                from: 'erick-poleto@hotmail.com',
                template: '/confirmEmail',
                context: {token, email}
            }, err => {
                if(err){
                    console.info(err)
                }
                return res.send();
            })
        }catch(e){
            console.info(e)
        }
    }

module.exports = reSend;