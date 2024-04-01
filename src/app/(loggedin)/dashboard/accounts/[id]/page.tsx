import styles from "./Account.module.css";

export default function Account({ params }: any) {

    return (
      <section className={styles.account}>
        <h1>Account</h1>
        <p>{params.id}</p>
      </section>
    )
  }
  