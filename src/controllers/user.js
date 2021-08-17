const { pool, createTableUsers } = require('../config/db')

createTableUsers()

exports.getUsers = (req, res) => {
  pool.query('SELECT * FROM users order by id',
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.getUserByID = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users where id = $1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'User not found!' })
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.addUser = (req, res) => {
  const { name, email, password, nick } = req.body

  pool.query('INSERT INTO users (name, email, password, nick) VALUES ($1, $2, $3, $4)',
    [name, email, password, nick], (error) => {
      if (error) {
        console.log(error)
        throw error
      }
      res.status(201).json({ status: 'success', message: 'User created!' })
    }
  )
}

exports.updateUser = (req, res) => {
  const { id, name, email, password, nick } = req.body
  pool.query('UPDATE users set name=$1, email=$2, password=$3, nick=$4 where id=$5',
    [name, email, password, nick, id], error => {
      if (error) {
        console.log(error)
        throw error
      }
      res.status(201).json({ status: 'success', message: 'User edited!' })
    }
  )
}

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE from users where id=$1',
    [id], (error, results) => {
      if (error || results.rowCount == 0) {
        return res.status(401).json({ status: 'error', 
        message: 'Error when removing user!' })
      }
      res.status(201).json({ status: 'success', 
      message: 'User removed!' })
    }
  )
}
