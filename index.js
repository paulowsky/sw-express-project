const express = require('express')
const cors = require('cors')
const { checkSchema, validationResult } = require('express-validator')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

const hello = async (req, res) => {
  const name = 'Paulo'

  res.status(200).json({ name })
}

const priority = (req, res) => {
  try {
    const err = validationResult(req);
    
    if (!err.isEmpty()) {
      res.status(400).json(err)

    } else {
      const { id, name, age } = req.body

      if (age > 65) res.status(201).json({ id, name, age, message: "BEM-VINDO, ACESSO PREFERENCIAL" })
      else res.status(200).json({ id, name, age, message: "BEM-VINDO" })
    }
  } catch(err) {
    res.status(500).json({error: err.message})
  }
}

app.route('/hello')
  .get(hello)
  .post(
    checkSchema({
      id: {
        in: ['body'],
        errorMessage: 'property id is wrong',
        isInt: true,
        exists: true
      },
      name: {
        in: ['body'],
        errorMessage: 'property name is wrong',
        isString: true,
        exists: true
      },
      age: {
        in: ['body'],
        errorMessage: 'property age is wrong',
        isInt: true,
        exists: true
      },
    }),
    priority
  )

app.listen(3000, () => console.log('Server running in port 3000'))
