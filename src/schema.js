import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

import { films, people } from './data'

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: {
    name: {
      type: GraphQLString,
      resolve(people) {
        return people.name
      }
    }
  }
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      films: {
        type: GraphQLString,
        resolve() {
          return films().then(f => f.count)
        }
      },
      people: {
        type: new GraphQLList(PeopleType),
        resolve() {
          return people().then(f => f.results)
        }
      }
    }
  })
})
