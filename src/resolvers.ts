import { sortBy } from "lodash";
import { MappedOrders, OrderList } from "./data-sources";

export type RetrieveOrdersInput = {
    sortBy: string
    isAscending: boolean;
}

type DataSource = {
    orderList: OrderList
}

export default {
    Query: {
        retrieveOrders: async (_: any, { sortBy: sortString, isAscending }: RetrieveOrdersInput, { dataSources: { orderList } }: { dataSources: DataSource }) => {
            const orders = await orderList.getList();
            if (!sortBy) return orders;
            const sortedOrders = sortBy(orders, sortString);
            if (isAscending) sortedOrders.reverse();
            return sortedOrders;
        },
    },
    // Further mapping/custom logic per field added here
    Order: {
        carrierService: ({ carrierService }: MappedOrders) => carrierService,
        orderClientRef: ({ orderClientRef }: MappedOrders) => orderClientRef,
        addressName: ({ addressName }: MappedOrders) => addressName,
        addressEmail: ({ addressEmail }: MappedOrders) => addressEmail,
        skuBarCode: ({ skuBarCode }: MappedOrders) => skuBarCode,
    }
};