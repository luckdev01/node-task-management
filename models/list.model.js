const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = Schema.Types
const Card = require('./card.model')

const ListSchema = new Schema({
  title: Types.String,
  cards: [{ type: Types.ObjectId, ref: 'Card', default: [] }]
})

module.exports = mongoose.model('List', ListSchema, 'lists')
