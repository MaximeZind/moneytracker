import styles from './Home.module.css';
import HeroSection from '../../components/HeroSection';

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
    </main>
  )
}
