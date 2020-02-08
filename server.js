const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const config = require('./config/index')
const database = require('./config/database')
const seederService = require('./services/seeder.service')

mongoose.connect(database.remoteUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.json())

const corsConfig = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
}

app.use(corsConfig)

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

if (config.seedData) {
  seederService.seedData()
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
