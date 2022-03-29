import resolvers from '../resolvers';

describe('resolvers', () => {
    const mockOrderList = {
        getList: jest.fn()
    };
    const orderList = [
        {
            data: 'foo bar data',
            label: 'bar of the foo label',
            random: 'details',
            quantity: 0
        },
        {
            data: 'zzz sleepy data (or last alphabetically?)',
            label: 'bar of the foo label',
            random: 'other details',
            quantity: 100
        },
        {
            data: 'A+ first data!',
            label: 'bar of the foo label',
            random: 'even more other details',
            quantity: 30
        }
    ]
    beforeEach(() => {
        mockOrderList.getList.mockResolvedValue(orderList);
    })

    describe('Queries', () => {
        it('should retrieve all orders unsorted if no sort or filter given', async () => {
            const allOrders = await resolvers.Query.retrieveOrders({}, {}, { dataSources: { orderList: mockOrderList } });
            expect(allOrders).toEqual(orderList)
        })

        describe('retrieveOrders - sortBy', () => {
            it('should leave unsorted if string given if field is not found in dataSource', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({ sortBy: 'randomSorter' }, {}, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toEqual(orderList)
            })

            it('should sort based on field and default descending', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { sortBy: 'data' }, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toEqual([orderList[2], orderList[0], orderList[1]])
            })

            it('should sort based on field and ascending if given', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { sortBy: 'data', isAscending: true }, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toEqual([orderList[1], orderList[0], orderList[2]])
            })

            it('should sort based on field and descending if given', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { sortBy: 'data', isAscending: false }, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toEqual([orderList[2], orderList[0], orderList[1]])
            })

            it('should sort based on quantity', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { sortBy: 'quantity', isAscending: false }, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toEqual([orderList[0], orderList[2], orderList[1]])
            })
        })

        describe('retrieveOrders - filterBy', () => {
            it('should filter based on field given', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { filterBy: { field:'random', values:['other details']}}, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toHaveLength(1);
                expect(allOrders).toEqual([orderList[1]]);
            })

            it('should filter based on field given when multiple values are sent', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { filterBy: { field:'random', values:['details', 'other details']}}, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toHaveLength(2);
                expect(allOrders).toEqual([orderList[0], orderList[1]]);
            })

            it('should not filter if field not found', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { filterBy: { field:'not in there', values:['doesnt matter']}}, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toHaveLength(3);
                expect(allOrders).toEqual(orderList);
            })
        });


        describe('retrieveOrders - combined filter and sort', () => {
            it('should sort and filter based on input', async () => {
                const allOrders = await resolvers.Query.retrieveOrders({}, { sortBy: 'data', filterBy: { field:'random', values:['details', 'other details']}}, { dataSources: { orderList: mockOrderList } });
                expect(allOrders).toHaveLength(2);
                expect(allOrders).toEqual([orderList[0], orderList[1]]);
            })
        })
    })

    describe('Order', () => {
        describe('carrierService', () => {
            it('should return carrierService as passed into function', () => {
                const fakeCarrier = 'Quick posty inc';
                const carrierService = resolvers.Order.carrierService({ carrierService: fakeCarrier } as any);
                expect(carrierService).toEqual(fakeCarrier);
            })

        })
    })
})
