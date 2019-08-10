import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import App from './App'
import Board from './board'

describe('App.js test', () => {
  it('renders App without crashing', () => {
    shallow(<App />)
  })

  it('find .game', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.game').length).toBe(1)
  })
  it('find Board', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Board').length).toBe(1)
  })

  it('find Tic Tac Toe Game Word', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.text()).toEqual('Tic Tac Toe Game<Board />O : turn<Button />GAME MODE: 1 Player<Button /><Button />')
  })
})
