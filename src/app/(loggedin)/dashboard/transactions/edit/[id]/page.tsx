import styles from "./UpdateTransaction.module.css";
import UpdateTransactionForm from "@/components/forms/UpdateTransactionForm";

export default function UpdateTransaction({ params }: { params: { id: string}}) {

 const transactionId = params.id;
  return (
    <section className={styles.update_transaction_section}>
      <h1>Update Transaction</h1>
      <UpdateTransactionForm transactionId={transactionId} />
    </section>
  )
}
