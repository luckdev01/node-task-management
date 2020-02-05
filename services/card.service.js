const List = require('../models/list.model')
const Card = require('../models/card.model')

module.exports = {
  createTask(req, res) {
    List.findById(req.body.listId, (err, list) => {
      if (err) {
        return this._handleResponse(err, null, res)
      }

      if (!list) {
        return this._handleResponse('Error', null, res)
      }

      const card = {
        title: req.body.title,
        body: req.body.body
      }

      Card.create(card, (err, card) => {
        list.cards.unshift(card._id)
        list.save(() => {
          this._handleResponse(err, card, res)
        })
      })
    })
  },
  _handleResponse(err, data, res) {
    if (err) {
      res.status(400).end()
    } else {
      res.send(data)
    }
  }
}
