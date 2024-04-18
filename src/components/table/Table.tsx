import styles from "./Table.module.css";
import Row from './Row';

interface TableProps {
    headers: string[];
    data: TransactionObject[];
    hiddenIndexes: number[];
}

interface TransactionObject {
    month: string;
    category: string;
    date: string;
    debit: number;
    description: string;
    income: number;
    type: string;
}

export default function Table({ headers, data, hiddenIndexes }: TableProps) {
    let balance = 0;

    function getLastTransactionToDate(transactions: TransactionObject[]) {
        const currentDate = new Date(); // Current date as Date object

        const sortedTransactions = [...transactions].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        const lastTransactionToDate = sortedTransactions.find(transaction => {
            return new Date(transaction.date) <= currentDate;
        });
        return lastTransactionToDate;
    }

    const lastTransactionToDate = data && getLastTransactionToDate(data);
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {
                        headers && headers.map((header, index) => {
                            return (
                                <th className={`${styles.header_cell} ${styles.cell}`} key={index}>{header}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map((object, index) => {
                        const hidden = hiddenIndexes.includes(index);
                        balance = balance + object.income - object.debit;
                        let cellColor: string;
                        if (object.type === 'income' && object.income > 0) {
                            cellColor = styles.green_cell;
                        } else if (object.type === 'expense' && object.debit > 0) {
                            cellColor = styles.red_cell;
                        }
                        let isToday: Boolean = false;
                        let isLastTransactionToDate: Boolean = false;
                        if (object === lastTransactionToDate) {
                            isToday = true;
                            isLastTransactionToDate = true;
                        }
                        return (
                            <Row key={index} headers={headers} transaction={object} balance={balance} isToday={isToday} isHidden={hidden} />
                        )
                    })
                }
            </tbody>
        </table>
    )
}