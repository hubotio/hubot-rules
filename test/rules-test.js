'use strict'

/* global beforeEach, afterEach, describe, it */
/* eslint-disable no-unused-expressions */

const path = require('path')

const chai = require('chai')
const Hubot = require('hubot')

const expect = chai.expect
const Robot = Hubot.Robot
const TextMessage = Hubot.TextMessage

chai.use(require('sinon-chai'))

describe('require("hubot-rules")', () => {
  it('exports a function', () => {
    expect(require('../index')).to.be.a('Function')
  })
})

describe('rules', () => {
  let robot, user

  beforeEach(() => {
    robot = new Robot(null, 'mock-adapter-v3', false, 'hubot')
    robot.loadFile(path.resolve('src/'), 'rules.js')
    robot.adapter.on('connected', () => robot.brain.userForId('1', {
      name: 'john',
      real_name: 'John Doe',
      room: '#test'
    }))
    robot.run()
    user = robot.brain.userForName('john')
  })

  afterEach(() => {
    robot.shutdown()
  })

  it('tells the rules', (done) => {
    robot.adapter.on('send', function (envelope, strings) {
      const lines = strings[0].split('\n')

      expect(lines.length).to.eql(4)
      expect(lines[0]).to.match(/A robot may not harm humanity/i)
      expect(lines[1]).to.match(/A robot may not injure a human being/i)
      expect(lines[2]).to.match(/A robot must obey any orders given to it by human beings/i)
      expect(lines[3]).to.match(/A robot must protect its own existence/i)

      done()
    })

    return robot.adapter.receive(new TextMessage(user, 'hubot what are the rules'))
  })
})
