//Global types that can be imported into my components

export interface Account {
    id: string;
    name: string;
    type: string;
    transactions?: Transaction[];
}

//Transaction fetched from the server
export interface Transaction {
    accountId: string;
    amount: number;
    categoryId: string;
    category: Category;
    date: Date;
    id: number;
    description: string;
    type: string;
    recurring: boolean,
    frequencyAmount?: number;
    frequencyUnit?: string;
}

//Transaction sent to the server
export interface NewTransaction {
    accountId: string;
    amount: number;
    categoryId: string;
    date: Date;
    description: string;
    type: string;
    recurring: boolean,
    frequencyAmount?: number;
    frequencyUnit?: string;
}

export interface Category {
    id: string;
    name: string;
    transactions?: Transaction[];
}
