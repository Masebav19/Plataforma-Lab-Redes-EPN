import { Router } from 'express'
import { projectController } from '../controllers/projects.js'

export const project = Router()

project.get('/projects', projectController.getAllProjects)
project.get('/imagenLength', projectController.getImageLength)
project.get('/image/:index', projectController.getImage)
