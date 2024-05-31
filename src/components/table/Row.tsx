import { useState } from "react";
import styles from "./Row.module.css";
import Pencil from "./Pencil";
import Garbage from "./Garbage";
import Modal from "@/components/Modal";
import Button from "@/components/forms/formscomponents/SubmitButton";
import { deleteTransaction } from "@/app/services/transactions";

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
    amount: string;
    type: string;
    id: string;
}

const headerMapping: { [key: string]: keyof TransactionObject } = {
    Month: 'month',
    Category: 'category',
    Date: 'date',
    Debit: 'debit',
    Description: 'description',
    Income: 'income',
    Amount: 'amount',
    Type: 'type',
};

export default function Row({ headers, transaction, balance, isToday, isHidden }: TableProps) {

    const [modalContent, setModalContent] = useState('');

    function closeModal() {
        setModalContent('');
    }

    function openModal(string: string) {
        setModalContent(string);
    }

    async function handleDeleteTransaction(id: string) {
        const deleteTransactionResponse = deleteTransaction(id);
        deleteTransactionResponse.then((response) => {
            const status = response.status;
            if (status !== 200) {
                console.log(response.message);
            } else if (status === 200) {
                window.location.reload();
            }
        })
    }

    return (
        <tr className={`${isToday ? `${styles.row} ${styles.today}` : styles.row} ${isHidden ? styles.hidden : ''}`}>
            {
                headers.map((header: string, index) => {
                    const property = headerMapping[header];
                    const customClass = styles[header.toLowerCase()];                    
                    if (header !== "Balance") {                        
                        if (header.toLowerCase() === 'income' && transaction.income > 0) {
                            return (
                                <td className={`${styles.content_cell} ${styles.cell} ${styles.income} ${customClass}`} key={index}>{transaction[property]}</td>
                            )
                        } else if (header.toLowerCase() === 'debit' && transaction.debit > 0) {
                            return (
                                <td className={`${styles.content_cell} ${styles.cell} ${styles.expense} ${customClass}`} key={index}>{transaction[property]}</td>
                            )
                        } else {
                            return (
                                <td className={`${styles.content_cell} ${styles.cell} ${customClass}`} key={index}>{transaction[property]}</td>
                            )
                        }

                    } else if (header === "Balance") {
                        return (
                            <td key={index} className={`${styles.content_cell} ${styles.cell}  ${styles.balance_cell}`}>
                                <p className={styles.balance_cell_balance}>{balance}</p>
                                <div className={styles.options}>
                                    <Pencil openModal={openModal} />
                                    <Garbage openModal={openModal} />
                                </div>
                                {
                                    (modalContent === 'edit' || modalContent === 'delete') && (
                                        <Modal closeModal={closeModal}>
                                            <div className={styles.modal_content}>
                                                <p>{`Do you really want to ${modalContent} this transaction?`}</p>
                                                <div className={styles.modal_buttons}>
                                                    {modalContent === 'edit' && <a href={`/dashboard/transactions/edit/${transaction.id}`}><Button text="Yes" value="none" /></a>}
                                                    {modalContent === 'delete' && <Button text="Yes" value="none" onClick={() => handleDeleteTransaction(transaction.id)} />}
                                                    <Button text="Cancel" value="none" onClick={closeModal} />
                                                </div>
                                            </div>
                                        </Modal>
                                    )
                                }
                            </td>
                        )
                    }
                })
            }
        </tr>
    )
}