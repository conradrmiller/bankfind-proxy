const { ApolloServer } = require('@apollo/server');

const typeDefs = `#graphql

  input InstitutionsQuery {
    filters: String
    search: String
    fields: String
    sort_by: String
    sort_order: String
    limit: Int
    offset: Int
    format: String
    download: Boolean
    filename: String
  }

  type Institution {
    data: InstitutionData
  }

  type InstitutionData {
    NAME: String
  }

  type Query {
    institutions(query: InstitutionsQuery): [Institution]
  }
`;

const resolvers = {
    Query: {
        institutions: (_, { query }) => {
            data: {
                institutions: [
                    {
                        data: {
                            NAME: 'Northeast Bank of Sanford',
                        },
                    },
                    {
                        data: {
                            NAME: 'Bank of Bentonville',
                        },
                    },
                    {
                        data: {
                            NAME: 'Progressive Bank, National Association',
                        },
                    },
                    {
                        data: {
                            NAME: 'First Citizens Bank & Trust Company',
                        },
                    },
                    {
                        data: {
                            NAME: 'Ergo Bank',
                        },
                    },
                    {
                        data: {
                            NAME: 'Valley Bank, Green Bay',
                        },
                    },
                    {
                        data: {
                            NAME: 'Jefferson County Bank',
                        },
                    },
                    {
                        data: {
                            NAME: 'Partnership Bank',
                        },
                    },
                    {
                        data: {
                            NAME: 'Bank of Elkhart Lake',
                        },
                    },
                    {
                        data: {
                            NAME: 'Bank One, Waukesha',
                        },
                    },
                ];
            }
        },
    },
};

it('returns hello with the provided name', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const response = await testServer.executeOperation({
        query: 'query Institutions($query: InstitutionsQuery) {institutions(query: $query) {data {NAME}}}',
        variables: { query: { limit: 10 } },
    });
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.institutions).toBe(null);
});
