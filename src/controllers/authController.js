import express from 'express';

import { body, validationResult } from "express-validator";
import { login, logout, register } from "../services/authService.js";
import parseError from "../utils/parseError.js";
import { isGuest } from "../middlewares/guards.js";
import randomNumber from "../utils/randomNumber.js";

const router = express.Router()

async function authAction(req, res, action, httpErrorStatus) {
    const formData = req.body;
    console.log('formData', formData)
    try {
        const { errors } = validationResult(req)
        
        if( errors.length > 0 ) {
            throw errors;
        }
        
        let otp = randomNumber(4);

        let data;
        if( action === 'login' ) {
            data = await login(formData.email, formData.password, otp)
        } else if( action === 'register' ) {
            data = await register(formData.username, formData.email, formData.password, otp)
        }

        res.json(data);

    } catch ( error ) {
        const message = parseError(error)
        
        //400 - bad request
        res.status(httpErrorStatus).json({
            message
        })
    }
}

router.post('/login',
    isGuest(),
    body('email')
        .isEmpty()
        .withMessage('Email must not be empty!')
        .bail()
        .isEmpty()
        .withMessage('Email must be valid!')
        .isAlphanumeric()
        .withMessage('Email should contain only english letters and digits!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Email must be at least 6 characters long!'),
    async(req, res) => {
    await authAction(req, res, 'login', 400)
})

router.post('/register', isGuest(), async (req, res) => {
    await authAction(req, res, 'register', 400)
})

router.get('/logout', async (req, res) => {
    const token = req.token;
    
    await logout(token);
    
    res.status(204).end();//204 - no content
})



export default router;
