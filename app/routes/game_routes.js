const express = require('express')
const router = express.Router()

// require restaurant model
const Game = require('../models/games')
// const handle404 = require('./../lib/custom_errors')

// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// INDEX
// GET /games
router.get('/games', requireToken, (req, res, next) => {
  Game.find()
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
router.post('/games', requireToken, (req, res, next) => {
  const gameData = req.body.game
  Game.create(gameData)
    .then(game => res.status(201).json({game: game}))
    .catch(next)
})

// UPDATE
// PATCH /game/:id
// router.patch('/game/:id', (req, res, next) => {
//   const id = req.params.id
//   const restaurantData = req.body.restaurant
//   Restaurant.findById(id)
//     .then(handle404)
//     .then(restaurant => restaurant.updateOne(restaurantData))
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

// DESTROY
// DELETE /game/:id
router.delete('/library', (req, res, next) => {
  const id = req.params.id
  Game.findById(id)
    // .then(handle404)
    .then(game => game.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
