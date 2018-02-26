const fetch = require('node-fetch')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const fetchSource = sourceId =>
  fetch(
    `https://newsapi.org/v2/everything?sources=${sourceId}&apiKey=871c4309f5864dc28ac26a72e3ada496`
  )
    .then(response => response.json())
    .then(data => data.articles)
    .catch(error => {
      console.log('ERR', error)
    });

const SourceType = new GraphQLObjectType({
  name: 'Source',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (data, args) => {
        return data[0].author
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      source: {
        type: SourceType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (root, args) => {
          return fetchSource("abc-news").then(response => {
            return response
          })
        }
      }
    }),
  })
})

// const PostType = new GraphQLObjectType({
//   name: 'Post',
//   description: 'This is my post type',
//   fields: {
//     id: { type: GraphQLInt },
//     title: { type: GraphQLString },
//     body: { type: GraphQLString }
//   }
// })

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     posts: {
//       type: new GraphQLList(PostType),
//       args: {},
//       resolve (parentValue, args) {
//         return [
//           {
//             id: 1,
//             title: 'Test Post 1',
//             body: 'Lorem ipsum dolor sit amet'
//           },
//           {
//             id: 2,
//             title: 'Test Post 2',
//             body: 'Lorem ipsum dolor sit amet'
//           },
//           {
//             id: 3,
//             title: 'Test Post 3',
//             body: 'Lorem ipsum dolor sit amet'
//           }
//         ]
//       }
//     }
//   }
// })

// module.exports = new GraphQLSchema({
//   query: RootQuery
// })
