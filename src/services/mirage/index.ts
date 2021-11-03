import { createServer, Model, Factory } from 'miragejs'
import faker from 'faker'

interface IUser {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<IUser>>({})
    },

    factories: {
      user: Factory.extend({ // mass create records 
        name(index: number) {
          return `User ${index + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        }
      })
    },

    seeds(server) { 
      server.createList('user', 200) // number of records
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/users')
      this.post('/users')

      this.namespace = ''
      this.passthrough() // if not found route pass
    }
  })

  return server
}