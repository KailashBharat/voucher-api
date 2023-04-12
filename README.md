# voucher-api

One of our customers wants to have a REST or GraphQL API where customers can redeem vouchers, to be able to win prices. The process flow is as follows:

- Customers enters his/her voucher code, for validation
- Once the voucher code is validated, have the customer enter address information and submit the form.
- In the backend the data is stored, and a backend API call is invoked to make a backend call to a third party system to give out the actual price
  - This can be stubbed by sending an email for this assignment
- The customer is shown a confirmation page, telling them the item is on its way
- The focus should be on the API’s used in this scenario, the front end is not important.

## Additional app requirements
- All submitted data is stored in a database, including IP address, date, etc.
- Support for multiple campaigns, in parallel
- Each voucher can only be redeemed once

## Technical Requirements
- Build in Node.js 18, using typescript
- Preferred is that you use the express http framework
- Mysql as the database layer
- The most important API functionality is covered with unit tests, the decision what is important is left to the developer

## Not required, but nice to haves:
- A simple frontend to test the API with
- API documentation can be generated automatically and is available for frontend developers.
- Integration tests
- There are anti-abuse mechanisms in place.

## What you need to deliver
- The application, zipped, with installation/deployment instructions.
- A short summary/explanation of the security measurements embedded in the application and what they will be effective against.

## Run API

### Prerequisites

- Docker
- Node

### Todo
1. Create .env file and fill in the values (see .env.example)
2. Run yarn docker:postgres or yarn docker:mysql
3. yarn (install node_modules)
4. yarn dev (run development server)

## Resources
- [Graphql Sanbox env](https://flyby-locations-sub.herokuapp.com/)
