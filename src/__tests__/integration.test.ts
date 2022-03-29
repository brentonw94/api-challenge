import { ApolloServer } from "apollo-server";
import typeDefs from '../type-defs';
import resolvers from '../resolvers';
import { OrderList } from '../data-sources';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ orderList: new OrderList() }),
});

describe('retrieveOrders integration test', () => {

    it('should run the retrieveOrders query and return all data', async () => {

        const result = await server.executeOperation({
            query: `query RetrieveOrders($sortBy: SortingField, $isDescending: Boolean) {
                retrieveOrders(sortBy: $sortBy, isDescending: $isDescending) {
                  carrierService
                  orderClientRef
                  addressName
                  skuBarCode
                  addressEmail
                  skuQuantity
                }
              }`,
            variables: {
                "sortBy": "carrierService",
                "isDescending": false
            },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toBe('Hello world!');
    });


    it('should run the retrieveOrders and return only data given in query', () => {

    })


    it('should return error object if error in dataSources', () => {

    })
})