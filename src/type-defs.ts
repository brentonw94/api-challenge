const { gql } = require('apollo-server');

export default gql`
  type Query {
    retrieveOrders(sortBy: OrderField, isDescending: Boolean, filterBy: FilterOptions): [Order]
  }

  enum OrderField {
    carrierService 
    orderClientRef
    addressName
    addressEmail
    skuBarCode
    skuQuantity
  }

  input FilterOptions {
    field: OrderField
    values: [String]
  }

  type Order {
    carrierService: String
    orderClientRef: String
    addressName: String
    addressEmail: String
    skuBarCode: String
    skuQuantity: Int
  }
`;