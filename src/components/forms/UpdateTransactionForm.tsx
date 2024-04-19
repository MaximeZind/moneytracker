'use client'

import { FormEvent, useState } from 'react';
import styles from "./UpdateTransactionForm.module.css";
import { Account, Category, NewTransaction, Transaction } from '@/types/global';
import { newTransaction, updateTransaction } from '@/app/services/transactions';
import TextInput from './formscomponents/TextInput';
import SelectInput from './formscomponents/SelectInput';
import SubmitButton from './formscomponents/SubmitButton';

interface Props {
    transaction: Transaction;
    accounts: Account[];
    categories: Category[];
}


export default function UpdateTransactionForm({ transaction, accounts, categories }: Props) {

    const [isRecurring, setIsRecurring] = useState(transaction.recurring);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        formData.set('recurring', isRecurring.toString());
        const formJson = Object.fromEntries(formData.entries()) as unknown as NewTransaction;
        const data = {
            id: transaction.id,
            date: new Date(formJson.date),
            amount: Number(formJson.amount),
            description: formJson.description,
            type: formJson.type,
            accountId: formJson.accountId,
            categoryId: formJson.categoryId,
            recurring: isRecurring,
            frequencyAmount: Number(formJson.frequencyAmount),
            frequencyUnit: formJson.frequencyUnit,
            recurringEndingDate: formJson.recurringEndingDate && new Date(formJson.recurringEndingDate),
        }
        const updatedTransactionResponse = updateTransaction(data);
        updatedTransactionResponse.then((response) => {
            const status = response.status;
            if (status !== 200) {
                console.log(response.message)
            }
        })
    }

    const frequencyUnits = ["Days", "Months", "Years"];

    return (
        transaction &&
        <form onSubmit={handleSubmit} className={styles.new_transaction_form}>
            <div className={styles.main_infos}>
                <div className={styles.main_infos_left}>
                    <label htmlFor="date">Date of the transaction</label>
                    <input type="date" name="date" id="date" className={styles.date_input} defaultValue={new Date(transaction.date).toLocaleDateString('en-CA')} />
                    <TextInput
                        name='amount'
                        type='number'
                        label='Amount'
                        defaultValue={transaction.amount} />
                    <TextInput
                        name='description'
                        type='text'
                        label='Description'
                        defaultValue={transaction.description} />
                </div>
                <div className={styles.main_infos_right}>
                    <div className={styles.main_infos_right_type}>
                        <p>Transaction type</p>
                        <div className={styles.transaction_type_option}>
                            <input
                                type="radio"
                                id="income"
                                name="type"
                                value="income"
                                defaultChecked={transaction.type === "income"}
                            />
                            <label htmlFor="income">Income</label>
                        </div>
                        <div className={styles.transaction_type_option}>
                            <input
                                type="radio"
                                id="expense"
                                name="type"
                                value="expense"
                                defaultChecked={transaction.type === "expense"}
                            />
                            <label htmlFor="expense">Expense</label>
                        </div>
                    </div>
                    <SelectInput
                        name="accountId"
                        label='Account'
                        options={accounts}
                        defaultValue={transaction.accountId}
                        defaultDisplayedValue={transaction.account && transaction.account.name}
                    />
                    <SelectInput
                        name="categoryId"
                        label='Category'
                        options={categories}
                        defaultValue={transaction.categoryId}
                        defaultDisplayedValue={transaction.category && transaction.category.name}
                    />
                </div>
            </div>
            <div className={styles.recurring}>
                <div className={styles.recurring_checkbox}>
                    <input
                        type="checkbox"
                        id="recurring"
                        name="recurring"
                        value=""
                        onClick={() => setIsRecurring(!isRecurring)}
                        defaultChecked={isRecurring}
                    />
                    <label htmlFor="recurring">Recurring</label>
                </div>
                {isRecurring &&
                    <div className={styles.recurring}>
                        <div className={styles.recurring_frequency}>
                            <p>Every</p>
                            <TextInput
                                name="frequencyAmount"
                                type='number'
                                label='Amount'
                                defaultValue={transaction.frequencyAmount !== null ? transaction.frequencyAmount : undefined}
                            />
                            <SelectInput
                                name="frequencyUnit"
                                label='Unit'
                                options={frequencyUnits}
                                defaultValue={transaction.frequencyUnit !== null ? transaction.frequencyUnit : undefined}
                            />
                        </div>
                        <div className={styles.recurring_ending}>
                            <p>Until</p>
                            <input
                                type="date"
                                name="recurringEndingDate"
                                id="recurringEndingDate"
                                className={styles.date_input}
                                defaultValue={transaction.recurringEndingDate ? new Date(transaction.recurringEndingDate).toLocaleDateString('en-CA') : undefined}
                            />
                        </div>
                    </div>

                }
            </div>
            <SubmitButton value='submit' text='Update this transaction' />
        </form>
    )
}