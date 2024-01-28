import Link from "next/link";
import styles from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {

    return (
      <main className={styles.main}>
        <LoginForm></LoginForm>
      </main>
    )
  }
  