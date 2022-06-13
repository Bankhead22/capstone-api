const express = require('express')
const router = express.Router()

// require game model
const Game = require('../models/games')
// const handle404 = require('./../lib/custom_errors')

// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// INDEX
// GET /games
router.get('/library', requireToken, (req, res, next) => {
  Game.find({owner: req.user.id})
    .then(games => res.json({ games: games }))
    .catch(next)
})

// SHOW
// GET /restaurants/:id
// router.get('/restaurants/:id', (req, res, next) => {
//   const id = req.params.id
//   Restaurant.findById(id)
//     .populate('owner')
//     .populate('reviews.reviewer')
//     .populate('customers')
//     .then(handle404)
//     .then(restaurant => res.json({ restaurant: restaurant}))
//     .catch(next)
// })

// CREATE
// POST / game /
router.post('/library', requireToken, (req, res, next) => {
  // const gameData = req.body.game
  const gameData = {
    owner: req.user.id,
    name: req.body.name,
    released: req.body.released,
    image: req.body.background_image,
    id: req.body.id,
    inLibrary: true,
    type: 'wishlist'
  }
  Game.create(gameData)
    .then(game => res.status(201).json({game: game}))
    .catch(next)
})

// UPDATE
// PATCH /game/:id
router.patch('/library', requireToken, (req, res, next) => {
  const id = req.user.id
  // const gameData = req.body.game
  const gameData = {
    owner: req.user.id,
    type: req.body.type
  }
  Game.findById(id)
    // .then(handle404)
    .then(game => game.updateOne(gameData))
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /game/:id
router.delete('/library', requireToken, (req, res, next) => {
  const id = req.user.id
  const gameData = {
    owner: req.user.id,
    type: req.body.type,
    inLibrary: false
  }
  Game.findById(id)
  // .then(handle404)
    .then((game) => game.updateOne(gameData))
    .then((game) => game.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
