import styles from "./Account.module.css";
import AccountSection from "@/components/sections/AccountSection";

export default function Account({ params }: any) {

  const id = params.id;

    return (
      <section className={styles.account}>
        <h1>Account</h1>
        <AccountSection id={id}/>
      </section>
    )
  }
  