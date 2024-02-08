import styles from "./Accounts.module.css";
import TransactionsTable from "../../../components/TransactionsTable";
import AccountsSection from "../../../components/AccountsSection"

export default function Accounts() {

    return (
      <main className={styles.main}>
        <h1>Accounts</h1>
        <AccountsSection/>
      </main>
    )
  }
  