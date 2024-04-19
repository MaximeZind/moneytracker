import styles from "./UpdateTransaction.module.css";
import UpdateTransactionSection from "@/components/sections/UpdateTransactionSection";

export default function UpdateTransaction({ params }: { params: { id: string}}) {

 const transactionId = params.id;
  return (
    <section className={styles.update_transaction_section}>
      <h1>Update Transaction</h1>
      <UpdateTransactionSection transactionId={transactionId} />
    </section>
  )
}
