const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const dummyBooks = [
  {
    id: "1",
    name: "awesome book1",
    genre: "choco1",
    authorId: "3"
  },
  {
    id: "2",
    name: "awesome book2",
    genre: "choco2",
    authorId: "1"
  },
  {
    id: "3",
    name: "awesome book3",
    genre: "choco3",
    authorId: "1"
  },
  {
    id: "4",
    name: "awesome book4",
    genre: "choco4",
    authorId: "2"
  },
  {
    id: "5",
    name: "awesome book5",
    genre: "choco3",
    authorId: "3"
  },
  {
    id: "6",
    name: "awesome book6",
    genre: "choco2",
    authorId: "4"
  }
];

const dummyAuthors = [
  {
    id: "1",
    name: "Charles",
    age: 23
  },
  {
    id: "2",
    name: "David",
    age: 53
  },
  {
    id: "3",
    name: "Almond",
    age: 12
  },
  {
    id: "4",
    name: "Watermelon",
    age: 25
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return dummyAuthors.filter(author => author.id === parent.authorId)[0];
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return dummyBooks.filter(book => book.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return dummyBooks.filter(book => book.id === args.id)[0];
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return dummyBooks;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return dummyAuthors.filter(author => author.id === args.id)[0];
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return dummyBooks;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
