import { Order, OrderList } from "./data-sources";

type RetrieveOrdersInput = {
    sortBy: string
}

type DataSource = {
    orderList: OrderList
}

export default {
    Query: {
        retrieveOrders: async (_: any, { sortBy }: RetrieveOrdersInput, { dataSources: { orderList } }: { dataSources: DataSource }) => {
            const orders = await orderList.getList();
            console.log(orders)
            if (!sortBy) return orders;
            const upperSortBy = sortBy.toUpperCase();
            const sortedOrders = orders.sort((a, b) => (a[upperSortBy] > b[upperSortBy]) ? 1 : ((b[upperSortBy] > a[upperSortBy]) ? -1 : 0))
            return sortedOrders;
        },
    },
    Order: {
        carrierService: () => '',
        orderClientRef: () => '',
        addressName: () => '',
        addressEmail: () => '',
        skuBarCode: () => '',
    }
};