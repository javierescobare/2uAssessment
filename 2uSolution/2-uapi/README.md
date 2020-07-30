# 2uapi

Back end project for User Story 1

## Installation 🔧

Install project dependencies using:

```bash
npm install
```

## Usage 🚀

In order to run the app, you first need to add a .env file at the root of the project and fill up the fields with your MongoDB connection details using this format:

```
MONGO_URL = ''
MONGO_HOST = ''
MONGO_PORT = ''
MONGO_USER = ''
MONGO_PWD = ''
MONGO_DB = ''

SOCKET_URL = 'https://2usocket.azurewebsites.net'
```

Then, you can run:

```bash
npm start
```

Or, if you want to see this in action, see the [live demo](https://2uapi.azurewebsites.net/explorer).

It is also recommended that you see DEVELOPING.md.

## Run tests ⚙️

You can test acceptance criteria with [Mocha](https://mochajs.org/) by running:

```bash
npm run test
```

## Tools used 🛠️

- [Loopback 4](https://loopback.io/doc/en/lb4/) - A Node.js and Typescript framework based on Express.
- [Mocha](https://mochajs.org/) - Feature-rich JavaScript test framework running on Node.js and in the browser.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2) - Cloud-hosted MongoDB Service.
- [Azure App Services](https://azure.microsoft.com/en-us/services/app-service/) - Http-based service for hosting web applications, REST APIs, and mobile back ends.
