import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//model
import User from "../models/User.js";
import mailer from "../utils/mailer.js";

export async function register(username, email, password, otp) {
    const existingUsername = await User.findOne({username : username})
        .collation({
            locale: 'en',
            strength: 2//case insensitive
        })
    
    if( existingUsername ) {
        throw new Error('Username is taken!')
    }
    
    const existingEmail = await User.findOne({email : email})
        .collation({
            locale: 'en',
            strength: 2//case insensitive
        })
    
    if( existingEmail ) {
        throw new Error('Email is taken!')
    }
    
    const hashedPassword = await bcrypt.hash(password, Number(process.env['SALT']))
    
    const user = new User({
        username,
        email,
        hashedPassword,
        confirmOTP: otp,
    })
    
    let emailHtml = '<p>Please confirm your account.</p><p>OTP: '+ otp +'</p>'
    
    mailer(
        process.env['EMAIL_SMTP_USERNAME'],
        email,
        'Confirm account',
        emailHtml
    ).then(() => {
        user.save()
    }).catch(err => {
        console.log('error from mailer', err);
        throw err;
    })
    
    return createToken(user)
    
}

export async function login(email, password) {
    const existingEmail = await User.findOne({email : email})
        .collation({
            locale: 'en',
            strength: 2//case insensitive
        })
    
    if( !existingEmail ) {
        throw new Error('Incorrect email or password!')
    }
    
    const matchPassword = await bcrypt.compare(password, existingEmail.hashedPassword)//predicate -> returns true or false
    
    if( !matchPassword ) {
        throw new Error('Incorrect email or password!')
    }

    if( existingEmail.isConfirmed ) {
        return createToken(existingEmail)
    } else {
        throw new Error('Account is not active! Please contact admin!')
    }
    
}

export async function verifyConfirm(email, otp) {
    let existingEmail  = await User.findOne(email)
    
    if ( existingEmail ) {
        
        if( !existingEmail.isConfirmed ) {
            
            if( existingEmail.confirmOTP === otp ) {
                
               await User.findOneAndUpdate(email, {
                    isConfirmed: 1,
                    confirmOTP: null
               })
               
               return createToken(existingEmail); 
                
            } else {
                throw new Error('One-time password does not match!')
            }
            
        } else {
            throw new Error('This account is already confirmed!')
        }
        
    } else {
        throw new Error('This account does not exist!')
    }
}

function createToken({ username, email, _id, roles }) {
    const payload = {
        username,
        email,
        _id,
        roles
    }
    
    const token = jwt.sign(payload, process.env['JWT_SECRET'],{
        expiresIn: process.env['TOKEN_EXPIRATION_TIME']
    });
    
    return {
        ...payload,
        accessToken: token
    }
    
}

export function parseToken(token) {
    
    if(tokenBlackList.has(token)) {
        throw new Error('The token is blacklisted!');
    }
    
    return jwt.verify(token, process.env['JWT_SECRET'])
}

let tokenBlackList = new Set();

export function logout(token) {
    tokenBlackList.add(token);
}