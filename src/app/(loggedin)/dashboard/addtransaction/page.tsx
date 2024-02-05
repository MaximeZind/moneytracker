import styles from "./AddTransaction.module.css";
import TransactionsTable from "../../../components/TransactionsTable";

export default function AddTransaction() {

    return (
      <main className={styles.main}>
        <h1>Add Transaction</h1>
        <TransactionsTable />
      </main>
    )
  }
  