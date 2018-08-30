export interface IEmployee {
    id?: number;
    firstName?: string;
    lastName?: string;
    workPlace?: string;
}

export class Employee implements IEmployee {
    constructor(public id?: number, public firstName?: string, public lastName?: string, public workPlace?: string) {}
}
