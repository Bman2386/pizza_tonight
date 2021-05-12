# juice. Coding Challenge

The goal of this challenge is to test your abilities in a fullstack environment. There are no gotchas or tricks, but read the prompt carefully. This challenge is an iterative project that you can keep building on and use as a portfolio piece if you'd like. Feel free to ask Siri any questions along the way.

## Brief

Create a simple recommendation system of any kind. (We would love to get a pizza recommendation!)

You will start by creating a function that gives you the recommendation and eventually create a backend route that a client can call to receive this recommendation. You will then store this in a database after which you will build a frontend for a user to receive this recommendation using the backend service.

### Details
Here are the highlights of what we'd like to see built out for this project. This is not an exhaustive list, but we recommend following these steps in this order and getting as far as you can within the given time period. Again, you can keep iterating on this project in the future.

### Recommendation System
Your first step in this project will be to build a function that gives you a recommendation. You will build a simple recommendation system which will consist of two input params and a recommendation based on those inputs.

```
input 1 + input 2 = recommendation
```

You will use two different lists to create these inputs, ideally about 5 items per list, giving you about 25 different recommendation combinations.

### API Route
Your next step is to create an API route that will take in these inputs from a client and send back a recommendation.

### Database
In this step, you will create a database schema for MongoDB to store the inputs and recommendation. For future iterations, you can integrate it with a local instance of Mongo.

### Frontend
Here, you can get creative and make a frontend that a user can interact with to select inputs and get a recommendation. We would love to see this in Angular, but any frontend framework is fine. You can either create a separate repository or two different folders for the client and server applications.

### Nice to haves
We would love to see you work with Typescript and create interfaces/types as and when necessary. Use Classes to help you build out each of the modules

### What we're looking for
 - Good, clean code that is readable by any developer.
 - Consistent commit history to track changes.
 - Creativity on the frontend.



## Getting Started with this repo

Start off by forking this repository into your own github. Share a link to your own github when submitting your work. Do not push any code to the juice. repository.


A basic structure is already set up for you to get up and running quickly. Use controllers to handle your logic, use routes to create your individual API routes, and models to store your db schema and other interfaces.

### Prerequisites

You will need to start off by installing `yarn` for your own system if you don't already have it.

### Installation

Install packages
   ```sh
   yarn install
   ```

### Running the app
This will run your app on `localhost:3000` and listen for any changes that you make.
```sh
yarn start
```


