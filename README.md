# bankfind-proxy

## Introduction

This project is a graphql proxy api for the BankFind Suite api hosted by the FDIC.
>The BankFind Suite documentation can be found here: https://banks.data.fdic.gov/docs/#/Structure/searchInstitutions

The proxy implments the /institutions endpoint of the BankFind Suite and includes all same query parameters as the underlying api endpoint.

This project is built using Apollo Server. 
>The Apollo Server documentation can be found here: https://www.apollographql.com/docs/apollo-server/

The Apollo server is hosted in AWS Lambda. Serverless is utilized for the codification of the infrastructure.
>The documentation for integrating Apollo with Serverless and Lambda can be found here: https://www.apollographql.com/docs/apollo-server/deployment/lambda/
>Serverless documentation can be found here: https://www.serverless.com/framework/docs

## To start the project
1. Clone the project from GitHub
2. Run `npm i` to install the packages
3. To test the serverless handler locally run `serverless invoke local -f graphql -p query.json` in the command line

## To deploy the project to AWS
1. You must have an AWS account, install the AWS CLI, create an IAM user, and configure the AWS CLI with your IAM user credentials
2. Run `serverless deploy` in the terminal
3. You will see output that gives you the endpoints to reach the server
>This follows the documentation here: https://www.apollographql.com/docs/apollo-server/deployment/lambda/

## To Query the API
I recommend using the Apollo Sandbox to run queries on the API. You will need the url from the deployment step to put into the sandbox and then you build your query.
>The link to launch the sandbox is here: https://www.apollographql.com/docs/graphos/explorer/sandbox/

Below is an example query:
```
query Institutions($query: InstitutionsQuery) {
  institutions(query: $query) {
    data {
      NAME
    }
  }
}
```
You will also need to define the variables used in the query: 
```
{
  "query": {
    "limit": 10
  }
}
```

The sandbox includes tools to create a curl request from your query. Below is an example: 
```
curl --request POST \
    --header 'content-type: application/json' \
    --url '<aws lambda URL goes here>' \
    --data '{"query":"query Institutions($query: InstitutionsQuery) {\n  institutions(query: $query) {\n    data {\n      NAME\n    }\n  }\n}","variables":{"query":{"limit":10}}}'
```

## Runing tests
This project utilizes jest for unit testing. Run `npm run test` in the command line to start the test suite.
