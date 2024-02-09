import styles from './HeroSection.module.css';
import graphs from '../app/assets/graphs.png';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className={styles.hero_section}>
            <div className={styles.hero_section_text}>
                <h1>Easily manage your finances</h1>
                <h2>Effortlessly track your income and expenses, gaining valuable insights into your financial health at a glance.</h2>
                <h2>Visualize your financial journey and forecast future savings with our goal-setting feature, providing clarity on your path to financial success.</h2>
                <h2>Discover the power of financial planning as you easily manage, analyze, and optimize your money, ensuring a secure and prosperous future.</h2>
            </div>
            <Image src={graphs} alt="graphs" className={styles.hero_section_image}/>
        </section>
    )
}