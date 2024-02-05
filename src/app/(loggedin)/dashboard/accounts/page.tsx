import styles from "./Accounts.module.css";
import TransactionsTable from "../../../components/TransactionsTable";

export default function Accounts() {

    return (
      <main className={styles.main}>
        <h1>Accounts</h1>
        <TransactionsTable />
      </main>
    )
  }
  