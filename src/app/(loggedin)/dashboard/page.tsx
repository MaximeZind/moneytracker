import styles from "./Dashboard.module.css";
import TransactionsTable from "../../components/TransactionsTable";
export default function Dashboard() {

    return (
      <main className={styles.main}>
        <h1>Dashboard</h1>
        <TransactionsTable />
      </main>
    )
  }
  