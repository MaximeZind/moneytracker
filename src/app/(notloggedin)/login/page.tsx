import styles from "./LoginPage.module.css";
import LoginForm from "../../../components/forms/LoginForm";

export default function LoginPage() {

    return (
      <main className={styles.main}>
        <LoginForm/>
      </main>
    )
  }
  