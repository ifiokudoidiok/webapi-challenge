const express = require('express');

const dbAction = require('../data/helpers/actionModel');
const dbProject= require('../data/helpers/projectModel')

const actionRouter = express.Router();

actionRouter.get('/', getAllActions);
actionRouter.get('/:id',validateActionId, getActionByID);
actionRouter.delete('/:id',validateActionId, deleteAction);
actionRouter.put('/:id',validateActionId, validateAction, editAction);
actionRouter.get('/:id/actions',validateProjectId, getActionsById);
actionRouter.post('/:id/',validateProjectId,validateAction, createAction);

function getActionsById(req, res) {
    dbProject.get(req.project.id).then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json(error)
    })
}

function createAction(req, res) {
    
        const { description, notes, completed } = req.body;
        dbAction.insert({
          project_id: req.project.id,
          description,
          notes,
          completed
        }).then(action => {
          res.status(201).json(action);
        }).catch(error => {
            res.status(500).json(error)
        });
    
   
}
function editAction(req, res) {
    dbAction.update(req.action.id, req.body)
    .then(() => {
        res.status(200).json({...req.action, ...req.body})
        
    })
    .catch(error => {
        res.status(500).json({
            message: "Could not Update Action: " + error
        })
    })
}



function deleteAction(req,res) {
    dbAction.remove(req.action.id)
    .then( () => {
    res.status(200).json({
        success:true,
        message: "Successfully Deleted",
    
    deleted:req.action
    })
    })
    .catch( error => {
        res.status(500).json({
            errorMessage: "Could not Delete, Server error: "+error})
    })
}

function getActionByID(req, res) {
    res.json(req.action);
}

function getAllActions(req, res) {
    dbAction.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch()
}


//Middleware
function validateAction(req, res, next) {
    if (Object.keys(req.body).length) {
        if(req.body.notes && req.body.description){
            next();

        }
        else 
        {
            res.status(400).json({ message: "all fields are required!" });
        }
        
      } 
      else 
      {
        res.status(400).json({ message: "missing action data" });
      }
}


function validateActionId(req, res, next) {
    const id = req.params.id;
    dbAction.get(id)
    .then(action => {
        if(action){
            req.action = action;
            next()
        }else{
            res.status(404).json({ message: 'Action id does not correspond with an actual Action' });
        }
    })
    .catch(error => {
        res.status(404).json({ message: "invalid Action id: "  + error.message})
    })

}

function validateProjectId(req, res, next) {
    const id = req.params.id;
    dbProject.get(id)
    .then(project => {
        if(project){
            req.project = project;
            next()
        }else{
            res.status(404).json({ message: 'Project id does not correspond with an actual Project' });
        }
    })
    .catch(error => {
        res.status(404).json({ message: "invalid project id: "  + error.message})
    })

}

module.exports = actionRouter