import { RESTDataSource } from '@apollo/datasource-rest';

type T = any;

export class BankFindAPI extends RESTDataSource {
    override baseURL = 'https://banks.data.fdic.gov/api/';

    async getInstitutions(): Promise<T> {
        return this.get<T>(`institutions`);
    }
}
