import React from 'react'

import { screen, render, waitForElementToBeRemoved } from 'testUtils/jestUtils'
import { Roles } from 'constans'
import { servers } from 'testUtils'

import { PostListContainer } from './index'

const mockedPosts = [
  { id: 1, title: 'Some title', content: 'Some content' },
  { id: 2, title: 'Some title2', content: 'Some content2' },
]

const server = servers.postListContainer({ mockedPosts })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('PostListContainer', () => {
  test('Snapshot test', async () => {
    const { asFragment } = render(<PostListContainer role={Roles.admin} />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    expect(asFragment()).toMatchSnapshot()
  })
})
