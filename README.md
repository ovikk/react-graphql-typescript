A project to view the user list(CRUD) using React ,Typescript and Apolloclient graphql.

## To run the client
- Clone / Download the project
- yarn 
- yarn start 

## To run the server 
- Clone / Download the project https://github.com/kyyticom/kyyti-test-task-server
- npm install
- node server.js
- go to http://localhost:8080/graphiql to test GraphQL Querries and Mutation

Note: if you get the error in clientside:  
Access to fetch at 'http://localhost:8080/graphql' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

solution for the above error:
include cors() in the server

    server.use(
    '/graphql',
    bodyParser.json(),
    cors(),
    graphqlExpress({
        schema,
    }))



References:
https://facebook.github.io/create-react-app/docs/adding-typescript
https://www.apollographql.com/docs/react/react-apollo-migration.html
https://www.typescriptlang.org/docs/home.html
