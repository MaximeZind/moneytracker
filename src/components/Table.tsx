import styles from "./Table.module.css";

interface TableProps {
    headers: string[];
    data: Record<string, any>[];
  }

export default function Table({headers,data}: TableProps) {

    let balance = 0;
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
                            balance = balance + object.income - object.debit;
                            let cellColor: string;
                            if (object.type === 'income' && object.income > 0) {
                                cellColor = styles.green_cell;
                            } else if (object.type === 'expense' && object.expense > 0) {
                                cellColor = styles.red_cell;
                            }
                            return (
                                <tr key={index}>
                                    {
                                        headers.map((header:string, index) => {         
                                            if (header !== "Balance") {
                                                if (header.toLowerCase() === 'income' && object.income > 0){
                                                    return (
                                                        <td className={`${styles.content_cell} ${styles.cell} ${styles.income}`} key={index}>{object[header.toLowerCase()]}</td>
                                                    )
                                                } else if (header.toLowerCase() === 'debit' && object.debit > 0) {
                                                    return (
                                                        <td className={`${styles.content_cell} ${styles.cell} ${styles.expense}`} key={index}>{object[header.toLowerCase()]}</td>
                                                    )
                                                } else {
                                                    return (
                                                        <td className={`${styles.content_cell} ${styles.cell}`} key={index}>{object[header.toLowerCase()]}</td>
                                                    )
                                                }

                                            } else if (header === "Balance") {
                                                return (
                                                <td className={`${styles.content_cell} ${styles.cell}  ${styles.balance_cell}`}>{balance}</td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    )
}