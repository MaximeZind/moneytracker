import styles from "./UpdateTransaction.module.css";
import UpdateTransactionForm from "@/components/forms/UpdateTransactionForm";

export default function UpdateTransaction() {

  return (
    <section className={styles.new_transaction_section}>
      <h1>Edit Transaction</h1>
      <UpdateTransactionForm/>
    </section>
  )
}
