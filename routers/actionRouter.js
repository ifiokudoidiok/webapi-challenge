const express = require('express');

const dbAction = require('../data/helpers/actionModel');
const dbProject= require('../data/helpers/projectModel')

const actionRouter = express.Router();

actionRouter.get('/', getAllActions);


function getAllActions(req, res) {
    dbAction.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch()
}

module.exports = actionRouter