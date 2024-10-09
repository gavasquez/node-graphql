import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from "apollo-server";

const persons = [
  { name: 'John', phone: "034-1234567", street: "123 Main St", city: "Ibague", id: "3d594650-3436-11e9-bc50-8b80ba54c431", age: 30 },
  { name: 'Jane', phone: "034-7654321", street: "456 Main St", city: "Anytown", id: "3d594650-3436-11e9-bc52-8b80ba54c431" },
  { name: 'Bob', street: "789 Main St", city: "Neiva", id: "3d594650-3436-11e9-bc51-8b80ba54c431" },
  { name: 'Alice', street: "123 Main St", city: "Bogota", id: "3d594650-3436-11e9-bc59-8b80ba54c431" },
];

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person { 
    id: ID!
    name: String!
    phone: String
    check: String!
    address: Address!
    city: String!
    age: Int
    canDrink: Boolean!
  },

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find(person => person.name === name);
    },
  },
  Person: {
    address: (root) => `${root.street}, ${root.city}`,
    check: (root) => "Andres",
    canDrink: (root) => root.age > 18,
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
