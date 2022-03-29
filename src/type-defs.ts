const { gql } = require('apollo-server');

export default gql`
  type Query {
    retrieveOrdersBy(filter: OrderFilter): [Order]
    quantitySoldBy(filter: String): Int
  }

  enum OrderFilter {
    carrierService # leaving only carrierService as per requirement
    # orderClientRef
    # addressName
    # addressEmail
    # skuBarCode
    # skuQuantity
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