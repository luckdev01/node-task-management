const faker = require('faker')
const Board = require('../models/board.model')
const List = require('../models/list.model')
const Card = require('../models/card.model')
const config = require('../config/index')

module.exports = {
  seedData() {
    Board.countDocuments((err, count) => {
      if (count > 0) {
        return
      }

      this.createBoards()
    })
  },
  createBoards() {
    let boards = []

    Array.from(Array(config.numberOfBoards)).forEach(() => {
      boards.push({
        title: faker.lorem.sentence(7)
      })
    })

    Board.insertMany(boards, (err, savedBoards) => {
      this.createListsForBoards(savedBoards)
    })
  },
  createListsForBoards(boards) {
    boards.forEach(board => {
      this.createLists(board)
    })
  },
  createLists(board) {
    let lists = []
    Array.from(Array(config.numberOfListsPerBoard)).forEach((val, index) => {
      lists.push({
        title: index + faker.lorem.sentence(3)
      })
    })

    List.insertMany(lists, (err, savedLists) => {
      savedLists.forEach(savedList => {
        board.lists.push(savedList.id)
      })
      board.save(() => {
        this.createCardsForLists(savedLists)
      })
    })
  },
  createCardsForLists(lists) {
    lists.forEach(list => {
      this.createCards(list)
    })
  },
  createCards(list) {
    let cards = []

    Array.from(Array(config.numberOfCardsPerList)).forEach(() => {
      cards.push({
        title: faker.lorem.sentence(5),
        body: faker.lorem.paragraph(1)
      })
    })

    Card.insertMany(cards, (err, savedCards) => {
      savedCards.forEach(savedCard => {
        list.cards.push(savedCard.id)
      })
      list.save()
    })
  }
}
