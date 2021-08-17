const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router
  .get('/', UserController.getUsers)
  .post('/', UserController.addUser)
  .put('/', UserController.updateUser)
  .get('/:id', UserController.getUserByID)
  .delete('/:id', UserController.deleteUser)

module.exports = router
