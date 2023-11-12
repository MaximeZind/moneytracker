import Link from "next/link";
import styles from "./page.module.css";
import LoginForm from "../../components/LoginForm";

export default function Login() {
    return (
      <main className={styles.main}>
        <LoginForm></LoginForm>
      </main>
    )
  }
  