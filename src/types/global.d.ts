//Global types that can be imported into my components

export interface Account {
    id: string;
    name: string;
    type: string;
    transactions?: Transaction[];
}

export interface Transaction {
    accoundId: string;
    amount: number;
    category: string;
    date: string;
    id: number;
    description: string;
    type: "Income" | "Expense";
}