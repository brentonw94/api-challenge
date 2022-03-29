export default {
    Query: {
      retrieveOrdersBy: () => true,
      quantitySoldBy: () => 0,
    },
    Order: {
        carrierService: () => '',
        orderClientRef: () => '',
        addressName: () => '',
        addressEmail: () => '',
        skuBarCode: () => '',
    }
  };