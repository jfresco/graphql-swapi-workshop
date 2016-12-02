import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import express from 'express'
import graphqlHTTP from 'express-graphql'

const app = express()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world'
        }
      }
    }
  })
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000)
