import styles from "./AddTransaction.module.css";
import NewTransactionForm from "@/components/forms/NewTransactionForm";

export default function AddTransaction() {

  return (
    <section className={styles.new_transaction_section}>
      <h1>Add Transaction</h1>
      <NewTransactionForm />
    </section>
  )
}