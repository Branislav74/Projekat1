export interface ICity {
    id?: number;
    name?: string;
    postCode?: string;
    country?: string;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public postCode?: string, public country?: string) {}
}
