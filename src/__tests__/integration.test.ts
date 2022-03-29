import { ApolloServer } from "apollo-server";
import typeDefs from '../type-defs';
import resolvers from '../resolvers';
import { OrderList } from '../data-sources';

const mockServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ orderList: new OrderList() }),
});

const responseDataLite = {
    "retrieveOrders": [
        {
            "carrierService": "Royal Mail",
            "orderClientRef": "15087294",
        },
        {
            "carrierService": "Royal Mail",
            "orderClientRef": "15087294",
        },
        {
            "carrierService": "Royal Mail",
            "orderClientRef": "15087294",
        },
        {
            "carrierService": "UK Post",
            "orderClientRef": "15084444",
        },
        {
            "carrierService": "UK Post",
            "orderClientRef": "15084444",
        },
        {
            "carrierService": "Australia Post",
            "orderClientRef": "15055555",
        },
    ]
}

const ordersByCarrierService = {
    "retrieveOrders": [
        {
            "carrierService": "Australia Post",
            "orderClientRef": "15055555",
            "addressName": "Ruby Jensen",
            "skuBarCode": "ASK30",
            "addressEmail": "RubyJensen@teleworm.us",
            "skuQuantity": 1
        },
        {
            "carrierService": "UK Post",
            "orderClientRef": "15084444",
            "addressName": "Angelina Derrington",
            "skuBarCode": "B500HR14",
            "addressEmail": "AngelinaDerrington@rhyta.com",
            "skuQuantity": 1
        },
        {
            "carrierService": "UK Post",
            "orderClientRef": "15084444",
            "addressName": "Angelina Derrington",
            "skuBarCode": "ASK10",
            "addressEmail": "AngelinaDerrington@rhyta.com",
            "skuQuantity": 2
        }
    ]
}

const quantityBySkuQuantity = {
    "retrieveOrders": [
        {
          "skuBarCode": "ASK10",
          "skuQuantity": 1
        },
        {
          "skuBarCode": "ASK10",
          "skuQuantity": 2
        },
        {
          "skuBarCode": "B500HR14",
          "skuQuantity": 1
        },
        {
          "skuBarCode": "B500HR14",
          "skuQuantity": 1
        }
      ]
}

describe('retrieveOrders integration test', () => {

    it('should run the retrieveOrders lite query without sorting or filtering', async () => {
        const result = await mockServer.executeOperation({
            query: `query RetrieveOrders {
                  retrieveOrders {
                    orderClientRef
                    carrierService
                  }
                }`,
            variables: {},
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual(responseDataLite);
    })

    it('should send back all orders by carrierService', async () => {
        const result = await mockServer.executeOperation({
            query: `query RetrieveOrders($sortBy: OrderField, $isDescending: Boolean,
                $filterBy: FilterOptions) {
                  retrieveOrders(sortBy: $sortBy, isDescending: $isDescending,
                  filterBy: $filterBy) {
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
                "isDescending": false,
                "filterBy": {
                    "field": "carrierService",
                    "values": ["Australia Post", "UK Post"]
                }
            },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual(ordersByCarrierService);
    });

    it('should send back quantity field by skuBarCode', async () => {
        const result = await mockServer.executeOperation({
            query: `query RetrieveOrders($sortBy: OrderField, $isDescending: Boolean,
                $filterBy: FilterOptions) {
                  retrieveOrders(sortBy: $sortBy, isDescending: $isDescending,
                  filterBy: $filterBy) {
                    skuBarCode
                    skuQuantity
                  }
                }`,
            variables: {
                "sortBy": "skuBarCode",
                "filterBy": {
                  "field": "skuBarCode",
                  "values": ["B500HR14","ASK10"]
                }
              },
        });

        expect(result.errors).toBeUndefined();
        expect(result.data).toEqual(quantityBySkuQuantity);
    });


    it('should throw error if bad request is sent', async () => {
        const result = await mockServer.executeOperation({
            query: `query RetrieveOrders {
                  retrieveOrders {
                      thisFieldAintExisting
                  }
                }`,
            variables: {}
        });
        expect(result.errors).toBeDefined();
        expect(result.errors[0].message).toContain('Cannot query field "thisFieldAintExisting" on type "Order".');
    });
})