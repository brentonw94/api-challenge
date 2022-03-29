import { sortBy as sort } from "lodash";
import { MappedOrders, OrderList } from "./data-sources";

export type RetrieveOrdersInput = {
    sortBy: string
    isAscending: boolean;
    filterBy: FilterOptions
}

type FilterOptions = {
    field: string;
    values: string[];
}

type DataSource = {
    orderList: OrderList
}

export default {
    Query: {
        retrieveOrders: async (_: any, { sortBy, isAscending, filterBy }: RetrieveOrdersInput, { dataSources: { orderList } }: { dataSources: DataSource }) => {
            const orders = await orderList.getList();
            const filteredOrders = orders.filter(order => !filterBy || !order[filterBy.field] || filterBy.values.includes(order[filterBy.field]))
            if (!sortBy) return filteredOrders;
            const sortedOrders = sort(filteredOrders, sortBy);
            if (isAscending) sortedOrders.reverse();
            return sortedOrders;
        },
    },
    // Further mapping/custom logic per field can be added here
    Order: {
        carrierService: ({ carrierService }: MappedOrders) => carrierService,
        orderClientRef: ({ orderClientRef }: MappedOrders) => orderClientRef,
        addressName: ({ addressName }: MappedOrders) => addressName,
        addressEmail: ({ addressEmail }: MappedOrders) => addressEmail,
        skuBarCode: ({ skuBarCode }: MappedOrders) => skuBarCode,
    }
};