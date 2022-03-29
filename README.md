# api-challenge
## Assumptions
- Wasn't sure if "all orders *by*" meant filter by or sort by. Implemented both to be safe :)
- Assumption is we are aware of csv and it will always be housed within the repo (ie didnt design for external csv retrieval)
- Graphql implementation is flexible enough to cover all 3 cases without needing a specific "quantityOfTheseFields" query etc

## Overview
- Completed retrieveOrders query with the ability to sort by order field, filter by field and field value, and sort ascending or descending
- Resolver tests cover filter/sorting combinations
- Integration test cover 3 requirements 

<img width="372" alt="Screen Shot 2022-03-30 at 8 35 12 am" src="https://user-images.githubusercontent.com/29790417/160711219-5a3bbb8c-78a5-4423-bbd9-56f350d9ab95.png">

<img width="996" alt="Screen Shot 2022-03-30 at 8 35 54 am" src="https://user-images.githubusercontent.com/29790417/160711319-e561aa22-d57d-4014-b572-1e20ee64a6aa.png">

## Further improvements
- The final "quantity requirement" could be further refined with a 3rd "reduceBy" functionality (on top of sort/filter), where we could send "skuQuantity" as reducer target and define values of "skuBarCode" to reduce down to unique objects based on skuBarCode
- Make "headers" dynamic so future implementations of order_list.csv will still work
- Error handling on data source should be there, but not ultra important due to assumption that csv will always be housed in repo. If moved to S3 bucket or API would need to improver the interface handling there
- Data source tests: skipped for this task since csv handling is in our control, again would become very important if integrating externally
- Linting across the project
- Test cleanup to abstract and/or reuse data defined, basically dumped to data result at top of file
