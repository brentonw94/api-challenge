import { sortBy } from "lodash";
import { MappedOrders, OrderList } from "./data-sources";

type RetrieveOrdersInput = {
    sortBy: string
    isDescending: boolean;
}

type DataSource = {
    orderList: OrderList
}

export default {
    Query: {
        retrieveOrders: async (_: any, { sortBy: sortString, isDescending }: RetrieveOrdersInput, { dataSources: { orderList } }: { dataSources: DataSource }) => {
            const orders = await orderList.getList();
            if (!sortBy) return orders;
            const sortedOrders = sortBy(orders, sortString);
            if (isDescending) sortedOrders.reverse();
            return sortedOrders;
        },
    },
    Order: {
        carrierService: ({ carrierService }: MappedOrders) => carrierService,
        orderClientRef: ({ orderClientRef }: MappedOrders) => orderClientRef,
        addressName: ({ addressName }: MappedOrders) => addressName,
        addressEmail: ({ addressEmail }: MappedOrders) => addressEmail,
        skuBarCode: ({ skuBarCode }: MappedOrders) => skuBarCode,
    }
};