import styles from "./Settings.module.css";
import TransactionsTable from "../../../components/TransactionsTable";

export default function Settings() {

    return (
      <main className={styles.main}>
        <h1>Settings</h1>
        <TransactionsTable />
      </main>
    )
  }
  