import { RESTDataSource } from 'apollo-datasource-rest'
import csv from 'csvtojson';
import path from 'path';

export type MappedOrders = {
    carrierService: string;
    orderClientRef: string;
    addressName: string;
    addressEmail: string;
    skuBarCode: string;
    [key: string]: string;
}

const headers = [
    "carrierService",
    "orderClientRef",
    "addressName",
    "addressEmail",
    "skuBarCode",
    "skuQuantity"
];
export class OrderList extends RESTDataSource {
    async getList(): Promise<MappedOrders[]> {
        return await csv({ headers }).fromFile(path.join(`${__dirname}/data/order_lines.csv`));
    }
}
