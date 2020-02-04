const express = require('express')
const router = express.Router()
const boardService = require('../services/board.service')
const listService = require('../services/list.service')

router.get('/boards', boardService.getAll.bind(boardService))
router.get('/boards/:boardId', boardService.getById.bind(boardService))
router.put(
  '/boards/updateListsOrder',
  boardService.updateListsOrder.bind(boardService)
)
router.put('/boards/:boardId', boardService.update.bind(boardService))
router.post('/lists', listService.create.bind(listService))

module.exports = router
