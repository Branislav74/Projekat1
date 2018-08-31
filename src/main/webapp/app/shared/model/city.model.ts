export interface ICity {
    id?: number;
    name?: string;
    zipCode?: string;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public zipCode?: string) {}
}
