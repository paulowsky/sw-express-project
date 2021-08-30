const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  const { email, password } = req.body

  const user = {
    id: "1",
    name: "Paulo",
    email: "paulo@paulo.com",
    password: "paulo",
    nick: "paulowsky"
  }

  if (user.email !== email) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid email!'
    })
  } else if (user.password !== password) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid password!'
    })
  } else {
    const token = jwt.sign(
      user,
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      })
      return res.status(200).json({
        message: 'Auth successful!',
        token: token
      })
  }
}