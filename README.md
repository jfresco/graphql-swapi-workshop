# GraphQL Workshop
## Hello world
You have the boilerplate of a Node.js package and you want to make work a GraphQL server.

In order to install all dependencies, run `npm install`.

Create a directory `src` and an `index.js` inside it. In the newly created `index.js` file, paste this code:
```js
import express from 'express'

const app = express()

app.listen(4000)
```

So far, we have a very simple express application. Nothing to interesting here, but you can smoke-test it by
running `npm start`. If nothing crashes, you're good.

Let's add some GraphQL stuff. We have to create a schema. Let's do this by creating a new `schema.js` file
inside the `src` directory.

In it, we need to `import` some GraphQL classes that we'll help us to declare our entitites:

```js
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
```

Then, we can declare our schema:

```js
export default new GraphQLSchema({
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
```

This schema is simple and useless, but it is ok for now.

Let's go back to our `index.js` file and make some changes. First, we need to `import` the recently created
schema:

```js
import schema from './schema'
```

Then, we will use `express-graphql` to create the `express` endpoint that will parse our GraphQL queries:

```js
import graphqlHTTP from 'express-graphql'
```

Now we are ready to create the `express` endpoint, like this:

```js
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
```

Here, we are telling our `express` server that when it receives a request to `/graphql`, it will be handled
by the `express-graphql` middleware, that uses our schema. I hope you are getting a pretty good picture of what
happens here.

Run the app with `npm start` and browse to http://localhost:4000. What you are seeing is GraphiQL, kind of
graphical interface that allow us to run queries to our GraphQL server. Play a little bit with it. What can
you do? Take a look at your schema again. Does it makes sense?

## The Star Wars API
Star Wars API ([SWAPI](http://swapi.co/api/)) is a database containing characters, movies, planets and other
stuff about Star Wars movies. Is a REST API that returns data in JSON format.

Take a brief look to it and see what kind of entities you have and the format of information for each one.
The objective of this workshop is to start wrapping this API in a GraphQL schema, in order to query it using
GraphQL queries.

## Entities
The following exercise is kind of introspective one. We need to know the API we are wrapping, test it, see the
kind of information it returns, its types and even if it returns `null` values in certain cases.

We will want to identify entities, declare them in our schema using GraphQL's primitive types and complex
types created by us.

Let's take SWAPI's `people` endpoint. Make a basic request and take a look to the structure that returns.

I'll leave you a template here of how a basic type looks. Define yours based on what you are seeing.

```js
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
```

## Resolvers
So, we created our entities but our app still can't fetch data from SWAPI. Well, that's easy. Let's create
a new file named `data.js` inside `src` directory. In that file, we'll expose the helper functions that will
return the data from the API:

```js
import fetch from 'isomorphic-fetch'

export const people = () => fetch('http://swapi.co/api/people/').then(res => res.json())
```

When invoked, `people` function will return a `Promise` that will resolve to an object representing People
as seen in SWAPI documentation.

Go back to your `schema.js` file and `import` the helper function:
```js
import { people } from './data'
```

Then add a new field to the schema: `people`.

```js
people: {
  type: new GraphQLList(PeopleType),
  resolve() {
    return people().then(f => f.results)
  }
}
```

Look at the type and the `resolve` function. Check if you have to import other GraphQL class.

Test it by running `npm start`. Which queries can you do? Does it works?

## Going on
* Let's add other fields to the `People` type.
* Also, you can add other types.
* What about pagination?

## A complete example
There is a complete implementation of a GraphQL SWAPI server with many other features. Take a look to [its
source code](https://github.com/graphql/swapi-graphql).
