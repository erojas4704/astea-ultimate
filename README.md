# astea-ultimate

This is an application intended to serve as a middleman between a repair business and a remote legacy SOAP-based service
The legacy application is known to be extremely slow, suffering from dated design and a strictly synchronous user flow, as well as various bugs 
and security concerns.

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

The database is a Postgres database which is accessed using the Sequelize ORM. [Here](https://i.imgur.com/mTLC0YO.png) is a diagram of my current schema.
Every service object is also stored locally in the browser in our Redux store.

