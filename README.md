# The dealer

This application is a small web the lets the user randomly draw two poker hands and rank them.

## Getting Started

To start the application locally follow these steps;

### Dependency installation

From the root, install the required dependencies by executing the follow command in you terminal;

```bash
npm i
```

### Run a local instance

To run a local instance of the app you can either, run the development environment or build and the run a production ready version.

#### Development

For running the development environment, with hot-reloads and so on;

```bash
npm run dev
```

#### Production ready

For running the production ready version;

```bash
npm run build && npm run start
```

When either of the commands is executed, open [http://localhost:3000](http://localhost:3000) with your browser to go to the application.

#### API

There's also an API with two endpoints within the app itself.

##### Draw cards

Draw cards will return an array with two random generated poker hands. To access this endpoint go to [http://localhost:3000/api/draw-hands](http://localhost:3000/api/draw-hands).

##### Rank hands

Rank hands takes data for two different hands as query parameters. To access this endpoint go to [http://localhost:3000/api/rank-hands](http://localhost:3000/api/rank-hands). Here's an example request with hands defined; [http://localhost:3000/api/rank-hands?handOne=3♥,7♥,3♣,J♥,3♠&handTwo=J♣,T♥,3♦,K♠,5♠](http://localhost:3000/api/rank-hands?handOne=3♥,7♥,3♣,J♥,3♠&handTwo=J♣,T♥,3♦,K♠,5♠).

### Testing

There are some small tests in the project, that tests basic Poker logic. To run the tests execute the following command;

```bash
npm t
```
