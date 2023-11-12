import styles from './Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href='/login'>Login</Link>
    </main>
  )
}
