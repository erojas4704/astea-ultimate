# astea-ultimate

This is an application intended to serve as a middleman between a repair business and a remote legacy SOAP-based service
The legacy application is known to be extremely slow, suffering from dated design and a strictly synchronous user flow, as well as various bugs 
and security concerns. 
The lack of asynchronous design is the number 1 productivity killer in any company that uses it, and I seek to remedy that with this tool.

What astea-ultimate seeks to do is to provide an interface to assist with the use of this application by replacing the client entirely with a
much faster, and safer, version.
My client employs the use of optimistic rendering techniques and smart caching of data to deliver an user-experience the feels smooth and responsive.

Furthermore, this application provides a restful API for communicating with the service, using a React-based UI for conveying that information to the end user. 

Every transaction is cached in the local database so that it may be retrieved quickly in the frontend while it updates in the background.

## Stack

The backend is built on Node.js with express, with a React and Redux driven frontend as well as a Postgres database for persistent data. 
These are some of the technologies used:

1. axios
1. express
1. fast-xml-parser
1. jsonwebtoken
1. sequelize
1. xml2js
1. fontawesome
1. bootstrap
1. lodash
1. moment
1. react
1. react-bootstrap
1. react-router-dom
1. react-redux
1. redux-persist
1. redux-thunk
1. uuid

## Schema

The schema of our Postgres database is designed to closely follow the original's data structure, minus elements that were deemed unnecessary. 
The primary focus will be our Service Order. Those objects contain all the information needed for a repair order, with fields such as description, type, status,
and serial numbers. This holds a reference to the customer object as well as the technician it is currently assigned to.

My database manipulations are done using Sequelize. [Here](https://i.imgur.com/mTLC0YO.png) is a diagram of my current schema.
Every service object is also stored locally in the browser in our Redux store.

## Quick Setup


In /astea-ultimate /backend, and /astea-scraper, load up dependencies with:
`npm install`

/backend environment variables :
```
PORT=
SECRET_KEY=
ASTEA_BASE_URL=http://localhost:6002
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/astea
```

/astea-scraper environment variables:
```
DELAY=4
SERVER_PORT= /**This is the port of your backend server */
DEFAULT_USER=
DEFAULT_PASS=
DATABASE_URL=postgres://postgres:postgres@localhost:5432/astea
```

To populate the database with junk data for testing, you can run the `seeder.js` tool, located in /astea-scraper.
The seeder will also set up the database.
```node astea-scraper/seeder.js```





