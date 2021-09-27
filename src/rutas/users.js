const { Router } = require('express');
const validator = require("email-validator");
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { generateToken, tokenValidations } = require('../librerias/validatetoken');
const router = Router();
const Users = require('../models/userModel');;

// rutas
router.post('/login', async (req,res) =>{
    const payload = req.body;
    const validEmail = validator.validate(payload.email);
    if(!validEmail){
        res.status(400).json({ "error":"Correo y/o contraseña no válido(s)"});
        return;
    }
    const findUs = await Users.findOne({
        email: payload.email,
        pass: md5(payload.pass)
    });
    if(!findUs){
        res.status(400).json({ "error":"Correo y/o contraseña no válido(s)"});
        return;
    }
    const token = generateToken({
        id: findUs._id,
        name: findUs.name,
        email: findUs.email
    });
    res.status(200).json({token});
});

router.post('/register', async (req,res) =>{
    let payload = req.body;
    const validEmail = validator.validate(payload.email);
    // Validacion de email y contrasenia
    if(!validEmail || payload.pass1 !== payload.pass2){
        res.status(400).json({msg: 'Información de registro incorrecta'});
        return;
    }
    let objUser = {
        email: payload.email,
        pass: md5(payload.pass1),
        name: payload.name,
        lastName: payload.lastName
    };
    const us = await Users(objUser).save();
    res.status(200).json({user: us});
});

module.exports = router;