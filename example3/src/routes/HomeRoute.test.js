import { render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import HomeRoute from './HomeRoute'

const createServer = [
  {
    path: '/api/repositories',
    method: 'get',
    res: (req, res, ctx) => {
      return {
        items: [{}, {}],
      }
    },
  },
  {
    path: '/api/repositories',
    method: 'post',
    res: (req, res, ctx) => {
      return {
        items: [{}, {}, {}],
      }
    },
  },
]

const handlers = [
  // não adicionamos querystring aqui
  rest.get('/api/repositories', (req, res, ctx) => {
    const language = req.url.searchParams.get('q').split('language:')[1]
    console.log(language)
    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      })
    )
  }),
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

test('renders two links for each language', async () => {
  render(
    <MemoryRouter>
      {/* colocamos o componente que vamos testar dentro do MemoryRouter */}
      {/* o home route faz as requisições */}
      <HomeRoute />
    </MemoryRouter>
  )
  // await pause()
  // screen.debug()

  // loop over each language
  const languages = ['javascript', 'typescript', 'go', 'rust', 'java', 'python']
  for (let language of languages) {
    // for each language, make sure we see two links
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`),
    })
    expect(links).toHaveLength(2)
    // assert that the links have the appropriate full_name
    expect(links[0]).toHaveTextContent(`${language}_one`)
    expect(links[1]).toHaveTextContent(`${language}_two`)
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`)
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`)
  }
})

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 100)
  })
