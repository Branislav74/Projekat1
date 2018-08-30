import { ICity } from 'app/shared/model//city.model';

export interface IClient {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string;
    cit?: ICity;
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public city?: string,
        public cit?: ICity
    ) {}
}
