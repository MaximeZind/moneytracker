import { useState } from "react";
import styles from "./Row.module.css";
import Pencil from "./Pencil";
import Garbage from "./Garbage";
import Modal from "@/components/Modal";
import Button from "@/components/forms/formscomponents/SubmitButton";

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
    id: string;
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

    const [modalContent, setModalContent] = useState('');

    function closeModal() {
        setModalContent('');
    }

    function openModal(string: string) {
        setModalContent(string);
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
                                    <Pencil openModal={openModal}/>
                                    <Garbage openModal={openModal}/>
                                </div>
                                {
                                    modalContent !== '' && <Modal closeModal={closeModal}>
                                        <div className={styles.modal_content}>
                                            <p>{`Do you really want to ${modalContent} this transaction?`}</p>
                                            <div className={styles.modal_buttons}>
                                                {modalContent === 'edit' && <Button text="Yes" value="none" onClick={closeModal} />}
                                                {modalContent === 'delete' && <Button text="Yes" value="none" onClick={closeModal} />}
                                                <Button text="Cancel" value="none" onClick={closeModal} />
                                            </div>
                                        </div>
                                    </Modal>
                                }
                            </td>
                        )
                    }
                })
            }
        </tr>
    )
}