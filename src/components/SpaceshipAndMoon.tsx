'use client'

import Image from 'next/image';
import styles from './SpaceshipAndMoon.module.css';
import spaceship_on from "@/app/assets/spaceship_on.png";
import spaceship_off from "@/app/assets/spaceship_off.png";
import moon from '@/app/assets/moon.png';
import { useEffect, useState } from 'react';

interface SpaceshipAndMoonProps {
    balance: number;
    goal: number;
}

export default function SpaceshipAndMoon({ balance, goal }: SpaceshipAndMoonProps) {

    const percentage = (balance * 100 / goal) / 100;
    const [isSpaceshipOn, setIsSpaceshipOn] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSpaceshipOn(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(setUpMessage(percentage));
        }, 7000);

        return () => clearTimeout(timer);
    }, [percentage]);

    function setUpMessage(percentage: number) {
        if (percentage < 0.2) {
            return "Keep going! You're just getting started.";
        } else if ((percentage >= 0.2) && (percentage < 0.3)) {
            return "Making progress! You're on the right track.";
        } else if ((percentage >= 0.3) && (percentage < 0.4)) {
            return "Getting closer! Keep up the momentum.";
        } else if ((percentage >= 0.4) && (percentage < 0.5)) {
            return "Halfway there! Your efforts are paying off.";
        } else if ((percentage >= 0.5) && (percentage < 0.6)) {
            return "Progressing well! Keep pushing forward.";
        } else if ((percentage >= 0.6) && (percentage < 0.7)) {
            return "Almost there! Stay focused on your goal.";
        } else if ((percentage >= 0.7) && (percentage < 0.8)) {
            return "Great job! You're nearing the finish line.";
        } else if ((percentage >= 0.8) && (percentage < 0.9)) {
            return "Almost achieved! Keep the determination.";
        } else if ((percentage >= 0.9) && (percentage < 1)) {
            return "You're so close! Keep going for the win.";
        } else if (percentage >= 1) {
            return "Congratulations! Goal achieved, time for celebration!";
        }
        return "";
    }

    function setSpaceshipClassname(percentage: number) {
        if ((percentage >= 0) && (percentage < 0.2)) {
            return `${styles.spaceship_10}`;
        } else if ((percentage >= 0.2) && (percentage < 0.3)) {
            return `${styles.spaceship_20}`;
        } else if ((percentage >= 0.3) && (percentage < 0.4)) {
            return `${styles.spaceship_30}`;
        } else if ((percentage >= 0.4) && (percentage < 0.5)) {
            return `${styles.spaceship_40}`;
        } else if ((percentage >= 0.5) && (percentage < 0.6)) {
            return `${styles.spaceship_50}`;
        } else if ((percentage >= 0.6) && (percentage < 0.7)) {
            return `${styles.spaceship_60}`;
        } else if ((percentage >= 0.7) && (percentage < 0.8)) {
            return `${styles.spaceship_70}`;
        } else if ((percentage >= 0.8) && (percentage < 0.9)) {
            return `${styles.spaceship_80}`;
        } else if ((percentage >= 0.9) && (percentage < 1)) {
            return `${styles.spaceship_90}`;
        } else if (percentage >= 1) {
            return `${styles.spaceship_100}`;
        }
    }

    return (
        <div className={styles.spaceship_and_moon}>
            <Image
                className={styles.moon}
                src={moon}
                alt={'moon'} />
            <span className={`${setSpaceshipClassname(percentage)} ${styles.spaceship}`}>
                {
                    isSpaceshipOn ?
                        <Image
                            src={spaceship_on}
                            alt={'spaceship'} /> :
                        <Image
                            src={spaceship_off}
                            alt={'spaceship'} />
                }
            </span>
            {
                message !== '' && 
                <div className={styles.message_box}>
                    <p>{message}</p>
                </div>
            }
        </div>
    )
}