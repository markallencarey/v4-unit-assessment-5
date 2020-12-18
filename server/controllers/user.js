const bcrypt = require('bcryptjs')
const e = require('express')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body
    
    const [existingUser] = await db.user.find_user_by_username([username])
    if (existingUser) {
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const profilePic = 'https://robohash.org/${username}.png'

    const [newUser] = await db.user.create_user([username, hash, profilePic])
    req.session.user = newUser
    res.status(200).send(newUser)
  },

  login: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body


    const [existingUser] = await db.user.find_user_by_username([username])
    if (!existingUser) {
      return res.status(404).send('User does not exist')
    }

    console.log(existingUser)
    const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
    if (!isAuthenticated) {
      return res.status(401).send('Incorrect password')
    }

    delete existingUser.password

    req.session.user = existingUser
    res.status(200).send(existingUser)
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found')
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}