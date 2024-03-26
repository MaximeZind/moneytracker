import styles from "./Accounts.module.css";
import TransactionsTable from "../../../../components/TransactionsTable";
import AccountsSection from "../../../../components/AccountsSection"

export default function Accounts() {

    return (
      <section className={styles.accounts_section}>
        <h1>Accounts</h1>
        <AccountsSection/>
      </section>
    )
  }
  