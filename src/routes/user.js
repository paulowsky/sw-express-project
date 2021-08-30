const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')
const checkAuth = require('../middlewares/check_auth')

router
  .get('/', checkAuth, UserController.getUsers)
  .post('/', checkAuth, UserController.addUser)
  .put('/', checkAuth, UserController.updateUser)
  .get('/:id', checkAuth, UserController.getUserByID)
  .delete('/:id', checkAuth, UserController.deleteUser)

module.exports = router
