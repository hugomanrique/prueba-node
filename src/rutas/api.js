const { Router } = require('express');
const { tokenValidations } = require('../librerias/validatetoken');
const Parents = require('../models/parentModel');
const Childs = require('../models/childModel');
const router = Router();

router.get('/parents',tokenValidations, async (req,res) => {
    const list = await Parents.find({
        user: req.user.id,
    });
    res.status(200).json(list);
});

router.get('/children/:parentId', tokenValidations, async (req, res) =>{
    const parentId = req.params.parentId;
    const list = await Childs.find({
        parent: parentId
    }).populate('parent');
    res.status(200).json(list);
});

router.get('/parents', tokenValidations, async (req, res) =>{
    const list = await Childs.find({
        user: req.user.id
    });
    res.status(200).json(list);
});

router.post('/create-parent',tokenValidations, async (req,res) => {
    const payload = req.body;
    const created = await new Parents({
        description: payload.description,
        user: req.user.id
    }).save();
    res.status(200).json(created);
});

router.post('/create-child',tokenValidations, async (req,res) => {
    const payload = req.body;
    const created = await new Childs({
        name: payload.name,
        parent: payload.idParent
    }).save();
    res.status(200).json(created);
});

module.exports = router;