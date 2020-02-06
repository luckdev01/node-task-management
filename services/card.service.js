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
  deleteTask(req, res) {
    Card.deleteOne({ _id: req.params.cardId }, function(err) {
      if (err) {
        this._handleResponse(err, null, res)
      }

      List.updateOne(
        { _id: req.params.listId },
        { $pull: { cards: req.params.cardId } }
      ).exec(function(err, data) {
        if (err) {
          res.status(400).send(err.message)
        } else {
          res.send(data)
        }
      })
    })
  },
  _handleResponse(err, data, res) {
    if (err) {
      res.status(400).end(err.message)
    } else {
      res.send(data)
    }
  }
}
