import NewAccountForm from "@/components/forms/NewAccountForm";
import styles from "./NewAccount.module.css";

export default function NewAccount() {

    return (
      <section className={styles.new_account_section}>
        <h1>Create a new Account</h1>
        <NewAccountForm/>
      </section>
    )
  }
  