const List = require('../models/list.model')
const Board = require('../models/board.model')

module.exports = {
  create(req, res) {
    Board.findById(req.body.boardId, (err, board) => {
      if (err) {
        return this._handleResponse(err, null, res)
      }

      if (!board) {
        return this._handleResponse('Error', null, res)
      }

      List.create({ title: req.body.title }, (err, card) => {
        board.lists.push(card._id)
        board.save(() => {
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
