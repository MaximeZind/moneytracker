import styles from "./Accounts.module.css";
import AccountsSection from "@/components/sections/AccountsSection";

export default function Accounts() {

    return (
      <section className={styles.accounts_section}>
        <h1>Accounts</h1>
        <AccountsSection/>
      </section>
    )
  }
  