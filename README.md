**true-layer-test**

🚀 Deployed to [http://truelayer-test.samgarson.com/](http://truelayer-test.samgarson.com/)

## Intro

#### Some key decisions
- I chose to use [Next.js](http://nextjs.org) as it provides a number of things to help with speed of development, including:
  - APIs
  - Server Side Rendering
  - Typescript support
  - as well as basic React app boilerplate
- Jest for unit testing and Cypress for end-to-end testing

#### Some considerations
- I would expect the test thoroughness (both unit and E2E) to be higher before hitting production, however I tried to indicate my preference of level and strategy of testing.
- Error handling should be improved, particulary the user's experience of errors
- Security considerations, obervability/monitoring and accessibility all would require hardening before a production deployment
- Currently the test suite runs against real API endpoints—this should be changed to be independent of third party API availability (especially given Fun Translation's low rate limit)

## Run

#### Required Environment Variables

- `API_URL`: The URL the app is deployed at. Defaults to `http://localhost:3000` (the default port the app runs on in development) _Not required when using Docker_

### With Docker (recommended)

- Install [Docker](https://docs.docker.com/desktop/)
- Then:
```sh
docker build -t true-layer .
docker run -p 3000:3000 true-layer

# Visit the app on http://localhost:3000
```

### Without Docker

- Install [Node](https://nodejs.org/en/download/)
- Then:
```sh
npm install
npm run build
npm run start

# Visit the app on http://localhost:3000
```
