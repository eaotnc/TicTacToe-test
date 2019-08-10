import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Board from './index'

const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
describe('Board test', () => {
  it('renders Board without crashing', () => {
    shallow(<Board squares={squares} />)
  })

  it('find .board-row to be 3', () => {
    const wrapper = shallow(<Board squares={squares} />)
    console.log(wrapper.debug())
    expect(wrapper.find('.board-row').length).toBe(3)
  })
  it('find Board', () => {
    const wrapper = shallow(<Board squares={squares} />)
    expect(wrapper.find('Square').length).toBe(9)
  })
})
