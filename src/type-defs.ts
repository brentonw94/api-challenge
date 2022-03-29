const { gql } = require('apollo-server');

export default gql`
  type Query {
    retrieveOrders(sortBy: SortingField, isAscending: Boolean): [Order]
  }

  enum SortingField {
    carrierService 
    orderClientRef
    addressName
    addressEmail
    skuBarCode
    skuQuantity
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