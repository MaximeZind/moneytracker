import { useState } from "react";
import styles from "./Row.module.css";
import Modal from "@/components/Modal";

interface TableProps {
    headers: string[];
    transaction: TransactionObject;
    balance: number;
    isToday: Boolean;
    isHidden: Boolean;
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

const headerMapping: { [key: string]: keyof TransactionObject } = {
    Month: 'month',
    Category: 'category',
    Date: 'date',
    Debit: 'debit',
    Description: 'description',
    Income: 'income',
    Type: 'type',
};

export default function Row({ headers, transaction, balance, isToday, isHidden }: TableProps) {

    const [isModal, setIsModal] = useState(false);

    function closeModal() {
        console.log('closing');
        
        setIsModal(false);
    }

    function openModal() {
        console.log('hello');

        setIsModal(true);
    }

    return (
        <tr className={`${isToday ? `${styles.row} ${styles.today}` : styles.row} ${isHidden ? styles.hidden : ''}`}>
            {
                headers.map((header: string, index) => {
                    const property = headerMapping[header];
                    if (header !== "Balance") {
                        if (header.toLowerCase() === 'income' && transaction.income > 0) {
                            return (
                                <td className={`${styles.content_cell} ${styles.cell} ${styles.income}`} key={index}>{transaction[property]}</td>
                            )
                        } else if (header.toLowerCase() === 'debit' && transaction.debit > 0) {
                            return (
                                <td className={`${styles.content_cell} ${styles.cell} ${styles.expense}`} key={index}>{transaction[property]}</td>
                            )
                        } else {
                            return (
                                <td className={`${styles.content_cell} ${styles.cell}`} key={index}>{transaction[property]}</td>
                            )
                        }

                    } else if (header === "Balance") {
                        return (
                            <td key={index} className={`${styles.content_cell} ${styles.cell}  ${styles.balance_cell}`}>
                                <p className={styles.balance_cell_balance}>{balance}</p>
                                <div className={styles.options}>
                                    <span className={styles.pencil} onClick={openModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="Layer_27" data-name="Layer 27"><path d="M50.94,50.5H12a1.5,1.5,0,0,0,0,3H50.94A1.5,1.5,0,0,0,50.94,50.5Z" /><path d="M51.68,12.38h0c-2.83-2.83-7.88-2.39-11.26,1L20.24,33.55a1.47,1.47,0,0,0-.39.67l-3,11.16a1.51,1.51,0,0,0,1.84,1.83l11.15-3a1.4,1.4,0,0,0,.67-.38L47.86,26.46l2.83-2.83C53.75,20.71,54.75,15.4,51.68,12.38Z" /></g></svg>
                                    </span>

                                    <span className={styles.bin}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 58.67"><defs></defs><title>Asset 25</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z" /><path d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z" /><path d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z" /></g></g></svg>
                                    </span>
                                </div>
                            </td>
                        )
                    }
                })
            }
        </tr>
    )
}