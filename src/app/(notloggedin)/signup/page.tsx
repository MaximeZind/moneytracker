import styles from "./page.module.css";
import SignUpForm from "../../../components/forms/SignUpForm";

export default function Login() {
    return (
      <main className={styles.main}>
        <h1>Signup</h1>
        <SignUpForm />
      </main>
    )
  }
  