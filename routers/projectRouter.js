const express = require('express');

const dbProject = require('../data/helpers/projectModel')

const projectRouter = express.Router();

projectRouter.get('/', getAllProjects);
projectRouter.post('/', validateProject, addProject);
projectRouter.get('/:id',validateProjectId, getProjectById);
projectRouter.delete('/:id',validateProjectId, deleteProject);
projectRouter.put('/:id',validateProject,validateProjectId, updateProject);

function updateProject(req, res) {
    dbProject.update(req.project.id, req.body)
.then(project => {
    res.status(200).json({...req.project, ...req.body})
})
.catch(error => {
    res.status(500).json({
        message: "Could not Update Project: " + error
    })
})
}

function getProjectById(req, res) {
    res.json(req.project);
}


function deleteProject(req, res) {
    dbProject.remove(req.project.id)
    .then( () => {
    res.status(200).json({
        success:true,
        message: "Successfully Deleted",
    
    deleted:req.project
    })
    })
    .catch( error => {
        res.status(500).json({
            errorMessage: "Could not Delete, Server error: "+error})
    })
}

function addProject(req, res) {
dbProject.insert(req.body)
.then(project => {
    res.status(201).json(project)
})
.catch(error => {
    
    res.status(500).json({
      message: 'Error adding the new project: ' + error.message,
    });
  })
}


function getAllProjects(req, res) {
dbProject.get()
.then(projects => {
    res.status(200).json(projects)
})
.catch(error => {
    res.status(500).json({
        errorMessage: "projects not available: " + error 
    })
})
}


//Middleware
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

function validateProject(req, res, next) {
    if (Object.keys(req.body).length) {
        if(req.body){//It still has a bug, fix if you have the time.
            next();

        }
        else 
        {
            res.status(400).json({ message: "all fields are required!" });
        }
        
      } 
      else 
      {
        res.status(400).json({ message: "missing user data" });
      }
}

module.exports = projectRouter