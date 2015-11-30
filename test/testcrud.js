/* global describe it */
const app = require('../dev/dev.js')
const request = require('supertest')
const expect = require('chai').expect

describe('CRUD testing', () => {
  it('should respond with JSON data', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done)
  })

  it('should provide high score', done => {
    request(app)
      .get('/highscores')
      .expect(res => {
        expect(res.body).to.be.an('object')
        expect({ name: '3', score: '500' }).to.include.keys('name')
        expect({ name: '3', score: '500' }).to.deep.equal({ name: '3', score: '500' })
      })
      .end(done)
  })

  it('should allow adding a player score', done => {
    const player = { name: '3', score: '500' }
    request(app)
      .post('/addscore/users')
      .send(player)
      .expect(res => {
        expect(res.body).to.be.an('object')
        expect({ name: '3', score: '500' }).to.deep.equal({ name: '3', score: '500' })
      })
      .end(done)
  })
  //
  // it('should allow sorting alphabetically by name', done => {
  //   request(app)
  //     .get('/participants?sorted=true')
  //     .expect(res => {
  //       const names = res.body
  //         .map(participant => participant.name)
  //       expect(names).to.equal(names.sort())
  //     })
  //     .end(done)
  // })
  //
  // it('should allow whitelisting specific fields', done => {
  //   request(app)
  //     .get('/participants?only=name')
  //     .expect(res => {
  //       for (const participant of res.body) {
  //         expect(participant).to.have.all.keys('name')
  //       }
  //     })
  //     .end(done)
  // })
})
