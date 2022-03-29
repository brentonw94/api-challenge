import { ApolloServer } from "apollo-server";
import { OrderList } from "./data-sources";
import resolvers from './resolvers';
import typeDefs from './type-defs';

export const server = new ApolloServer({
    resolvers,
    typeDefs,
    dataSources: () => ({
        orderList: new OrderList()
    })
});

server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});