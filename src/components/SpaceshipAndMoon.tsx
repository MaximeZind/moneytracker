import Image from 'next/image';
import styles from './SpaceshipAndMoon.module.css';
import spaceship_on from "@/app/assets/spaceship_on.png";
import spaceship_off from "@/app/assets/spaceship_off.png";
import moon from '@/app/assets/moon.png';


export default function HeroSection() {
    return (
        <div className={styles.spaceship_and_moon}>
            <Image className={styles.moon} src={moon} alt={'moon'} />
            <Image className={styles.spaceship} src={spaceship_off} alt={'spaceship'} />
        </div>
    )
}