import { RESTDataSource } from '@apollo/datasource-rest';
export class BankFindAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'https://banks.data.fdic.gov/api/';
    }
    async getInstitutions() {
        return this.get(`institutions`);
    }
}
