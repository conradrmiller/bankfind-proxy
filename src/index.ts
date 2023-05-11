import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { RESTDataSource } from '@apollo/datasource-rest';

type T = any;

const formatQuery = (rawQuery) => {
    const queryKeys = Object.keys(rawQuery.query);
    if (queryKeys.length > 0) {
        return queryKeys
            .map((key) => `${key}=${encodeURIComponent(rawQuery.query[key])}`)
            .join('&');
    }
    return '';
};

class BankFindAPI extends RESTDataSource {
    override baseURL = 'https://banks.data.fdic.gov/api/';

    async getInstitutions(args): Promise<T> {
        const response = await this.get<T>(`institutions?${formatQuery(args)}`);
        return response.data;
    }
}

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
    ACTIVE: String
    ADDRESS: String
    ASSET: Int
    BKCLASS: String
    CB: String
    CBSA: String
    CBSA_DIV: String
    CBSA_DIV_FLG: String
    CBSA_DIV_NO: String
    CBSA_METRO: String
    CBSA_METRO_FLG: String
    CBSA_METRO_NAME: String
    CBSA_MICRO_FLG: String
    CBSA_NO: String
    CERT: String
    CERTCONS: String
    CFPBEFFDTE: String
    CFPBENDDTE: String
    CFPBFLAG: String
    PRIORNAME1: String
    CHANGEC1: String
    CHANGEC2: String
    CHANGEC3: String
    CHANGEC4: String
    CHANGEC5: String
    CHANGEC6: String
    CHANGEC7: String
    CHANGEC8: String
    CHANGEC9: String
    CHANGEC10: String
    CHANGEC11: String
    CHANGEC12: String
    CHANGEC13: String
    CHANGEC14: String
    CHANGEC15: String
    CHARTER: String
    CHRTAGNT: String
    CITY: String
    CITYHCR: String
    CLCODE: String
    CMSA_NO: String
    CMSA: String
    CONSERVE: String
    COUNTY: String
    CSA: String
    CSA_NO: String
    CSA_FLG: String
    DATEUPDT: String
    DENOVO: String
    DEP: Int
    DEPDOM: Int
    DOCKET: String
    EFFDATE: String
    ENDEFYMD: String
    EQ: String
    ESTYMD: String
    FDICDBS: String
    FDICREGN: String
    FDICSUPV: String
    FED: String
    FED_RSSD: String
    FEDCHRTR: String
    FLDOFF: String
    FORM31: String
    HCTMULT: String
    IBA: String
    INACTIVE: String
    INSAGNT1: String
    INSAGNT2: String
    INSBIF: String
    INSCOML: String
    INSDATE: String
    INSDROPDATE_RAW: String
    INSDROPDATE: String
    INSDIF: String
    INSFDIC: Int
    INSSAIF: String
    INSSAVE: String
    INSTAG: String
    INSTCRCD: String
    LATITUDE: Int
    LAW_SASSER_FLG: String
    LONGITUDE: Int
    MDI_STATUS_CODE: String
    MDI_STATUS_DESC: String
    MSA: String
    MSA_NO: String
    MUTUAL: String
    NAME: String
    NAMEHCR: String
    NETINC: Int
    NETINCQ: Int
    NEWCERT: String
    OAKAR: String
    OCCDIST: String
    OFFDOM: Int
    OFFFOR: Int
    OFFICES: Int
    OFFOA: Int
    OTSDIST: String
    OTSREGNM: String
    PARCERT: String
    PROCDATE: String
    QBPRCOML: String
    REGAGNT: String
    REGAGENT2: String
    REPDTE: String
    RISDATE: String
    ROA: Int
    ROAPTX: Int
    ROAPTXQ: Int
    ROAQ: Int
    ROE: Int
    ROEQ: Int
    RSSDHCR: String
    RUNDATE: String
    SASSER: String
    SPECGRP: Int
    SPECGRPN: String
    STALP: String
    STALPHCR: String
    STCHRTR: String
    STCNTY: String
    STNAME: String
    STNUM: String
    SUBCHAPS: String
    SUPRV_FD: String
    TE01N528: String
    TE02N528: String
    TE03N528: String
    TE04N528: String
    TE05N528: String
    TE06N528: String
    TE07N528: String
    TE08N528: String
    TE09N528: String
    TE10N528: String
    TE01N529: String
    TE02N529: String
    TE03N529: String
    TE04N529: String
    TE05N529: String
    TE06N529: String
    TRACT: String
    TRUST: String
    ULTCERT: String
    UNINUM: String
    WEBADDR: String
    ZIP: String
  }

  type Query {
    institutions(query: InstitutionsQuery): [Institution]
  }
`;

interface ContextValue {
    dataSources: {
        bankFindAPI: BankFindAPI;
    };
}

const resolvers = {
    Query: {
        institutions: async (parent, args, { dataSources }) => {
            return dataSources.bankFindAPI.getInstitutions(args);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                bankFindAPI: new BankFindAPI({ cache }),
            },
        };
    },
});

console.log(`🚀  Server ready at: ${url}`);
