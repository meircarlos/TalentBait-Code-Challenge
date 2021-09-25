# TalentBait-Code-Challenge

## To Run the project

1. Install the project dependencies by running: `npm install`
2. Start the server by running: `npm run start`

## Heroku URL

https://secret-shelf-53244.herokuapp.com/

## Scripts

### Task 1 – Import the sentences collection to a Firebase firestore

This task can be found on the [load-sentences-dataset-to-firestore.js](./scripts/load-sentences-dataset-to-firestore.js) script

In order to run it, from the project directory, use: `node ./scripts/load-sentences-dataset-to-firestore.js`.

(**DON'T RUN IT** as it will exceed the usage limits of the firebase free tier)

### Task 2 – Write a script to aggregate for following information from the dataset

This task can be found on the [count-k-most-used-words-in-sentences-dataset.js](./scripts/count-k-most-used-words-in-sentences-dataset.js) script

In order to run it, from the project directory, use: `node ./scripts/count-k-most-used-words-in-sentences-dataset.js`.

## Swagger API Documentation

When building the API I first organized everything in swagger, it's not complete, meaning that the return definitions are not all there, but the main purpose is to have some basic documentation and be able to play around with the API with it, so feel free to use it. You just need to paste the [swagger.yaml](./swagger.yaml) content on [Swagger](https://editor.swagger.io/).

Now, take in mind that there is no validation middleware, as it wasn't requested, so you will be able to, for instance, enter a large page limit size, or a category that is not supported. So, please use it carefully. Enjoy :D
