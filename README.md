# Weentar Middle Layer

## Scripts
`npm start` - Starts the application

`npm run serve` - Runs the application in development mode

## Routes
`/getWalletMetadata/:id` - url `:id` - takes in a wallet metadata id - returns wallet

`/createWalletMetadata` - json `{ _id, username }` - creates and returns a new wallet metadata object

`/upgradeToCreator` - json `{ _id, collection_address }` - updates the wallet object to be a creator

`/getSocialToken` - json `{ _id, tokenAddress }` - returns the amount of token owned by user

`/upsertSocialToken` - json `{ _id, tokenAddress, amount } ` - inserts a new token or updates the existing token amount in a users wallet
`npm run serve` - Runs the application in development mode (hot reload)

## Environment File - .env
`MONGO_URI` - Mongo connection URI ie "mongodb://127.0.0.1:27017/weentar-data"

`PORT` - App port number
