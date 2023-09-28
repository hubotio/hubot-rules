'use strict'
const { describe, it, beforeEach, afterEach } = require('node:test')
const path = require('path')
const assert = require('node:assert/strict')
const { hook, reset } = require('./fixtures/RequireMocker.js')
const Hubot = require('hubot')

const Robot = Hubot.Robot
const TextMessage = Hubot.TextMessage
describe('require("hubot-rules")', () => {
  it('exports a function', () => {
    assert.equal(typeof require('../index'), 'function')
  })
})

describe('rules', () => {
  let robot, user

  beforeEach(async () => {
    hook('mock-adapter', require('./fixtures/MockAdapter.js'))
    robot = new Robot('mock-adapter', false, 'hubot')
    await robot.loadFile(path.resolve('src/'), 'rules.js')
    await robot.loadAdapter()
    robot.adapter.on('connected', () => robot.brain.userForId('1', {
      name: 'john',
      real_name: 'John Doe',
      room: '#test'
    }))
    await robot.run()
    user = robot.brain.userForName('john')
  })

  afterEach(() => {
    robot.shutdown()
    reset()
  })

  it('tells the rules', async () => {
    let wasCalled = false
    robot.adapter.on('send', async (envelope, strings) => {
      const lines = strings[0].split('\n')
      assert.equal(lines.length, 4)
      assert.match(lines[0], /A robot may not harm humanity/i)
      assert.match(lines[1], /A robot may not injure a human being/i)
      assert.match(lines[2], /A robot must obey any orders given to it by human beings/i)
      assert.match(lines[3], /A robot must protect its own existence/i)
      wasCalled = true
    })
    await robot.adapter.receive(new TextMessage(user, 'hubot what are the rules'))
    assert.deepEqual(wasCalled, true)
  })
})
