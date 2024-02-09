import NewAccountForm from "@/components/NewAccountForm";
import styles from "./NewAccount.module.css";

export default function NewAccount() {

    return (
      <main className={styles.main}>
        <h1>Create a new Account</h1>
        <NewAccountForm/>
      </main>
    )
  }
  