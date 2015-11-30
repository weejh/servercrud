const express = require('express')
const app = express()
// var _ = require('lodash')
var fs = require('fs')
const Promise = require('bluebird')
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
const listofPlayersfile = './dev/data.json'
const listofPlayersfilenew = './dev/datanew.json'
const readFile = Promise.promisify(require('fs').readFile)
const port = process.env.PORT || 3000
// const openFile = Promise.promisify(require('fs').open)
// const writeFile = Promise.promisify(require('fs').writeFile)
// const appendFile = Promise.promisify(require('fs').appendFile)
// const closeFile = Promise.promisify(require('fs').close)

app.get('/', function (req, res) {
  readFile(listofPlayersfile, 'utf8')
    .then(data => {
      res.send(JSON.parse(data))
      console.log(JSON.parse(data))
    })
})

app.get('/highscores', function (req, res) {
  readFile(listofPlayersfile, 'utf8')
    .then(data => {
      return (data)
    })
    .then(data => {
      const list = JSON.parse(data).player
      const nameHighscore = list.reduce((pass, curr) => {
        const currScore = curr.score
        const passScore = pass.score || '0'
        if (parseInt(passScore, 10) < parseInt(currScore, 10)) return curr
      })
      res.send(nameHighscore)
    })
})

app.post('/addscore/users', function (req, res) {
  readFile(listofPlayersfile, 'utf8')
    .then(data => {
      return data
    })
    .then(data => {
      const list = JSON.parse(data).player
      const name = req.body.name
      const score = req.body.score
      const found = list.filter(e => {
        if (e.name === name) {
          e.score = score
          return {}
        }
      })
      if (found.length === 0) {
        const newList = list.concat({ name: name, score: score })
        const newJson = JSON.stringify({'player': newList})
        writeTofile(listofPlayersfile, newJson)
        res.send(newJson)
      } else {
        const listUpdate = list.map(e => {
          if (e.name === name) return {name: name, score: score}
          return {name: e.name, score: e.score}
        })
        const jsonUpdate = JSON.stringify({'player': listUpdate})
        writeTofile(listofPlayersfile, jsonUpdate)
        res.send(jsonUpdate)
      }
    })
})

app.delete('/removescore/users', function (req, res) {
  readFile(listofPlayersfile, 'utf8')
    .then(data => {
      return data
    })
    .then(data => {
      const list = JSON.parse(data).player
      const name = req.body.name
      const found = list.map(e => {
        console.log(e.name)
        if (e.name === name) {
          return {name: e.name, score: '0'}
        } else {
          return {name: e.name, score: e.score}
        }
      })
      console.log(found)
      if (found.length === 0) {
        res.send('player no longer exists')
      } else {
      //  console.log(found)
        const jsonUpdate = JSON.stringify({'player': found})
        writeTofile(listofPlayersfile, jsonUpdate)
      //  res.send(jsonUpdate)
        res.send(jsonUpdate)
      }
    })
})

app.put('/changename/users', function (req, res) {
  readFile(listofPlayersfile, 'utf8')
    .then(data => {
      return data
    })
    .then(data => {
      const list = JSON.parse(data).player
      const name = req.body.name
      const newName = req.body.newName
      const found = list.map(e => {
        console.log(e.name)
        if (e.name === name) {
          return {name: newName, score: e.score}
        } else {
          return {name: e.name, score: e.score}
        }
      })
      console.log(found)
      if (found.length === 0) {
        res.send('player no longer exists')
      } else {
      //  console.log(found)
        const jsonUpdate = JSON.stringify({'player': found})
        writeTofile(listofPlayersfile, jsonUpdate)
      //  res.send(jsonUpdate)
        res.send(jsonUpdate)
      }
    })
})

app.listen(port)

function writeTofile (floder, data) {
  fs.writeFile(floder, data, function (err) {
    if (err) throw err
    console.log('The "data to append" was appended to file!')
  })
}
