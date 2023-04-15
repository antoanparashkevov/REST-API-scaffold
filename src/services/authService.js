import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//model
import User from "../models/User.js";

export async function register(username, email, password) {
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
    
    const hashedPassword = await bcrypt.hash(password, process.env['SALT'])
    
    const user = await User.create({
        username,
        email,
        hashedPassword
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
    
    return createToken(existingEmail)
    
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