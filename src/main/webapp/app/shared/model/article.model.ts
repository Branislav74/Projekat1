export interface IArticle {
    id?: number;
    name?: string;
    availableAmount?: number;
    articleNumber?: string;
    price?: number;
}

export class Article implements IArticle {
    constructor(
        public id?: number,
        public name?: string,
        public availableAmount?: number,
        public articleNumber?: string,
        public price?: number
    ) {}
}
