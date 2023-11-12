'use client'
import styles from './NotLoggedInHeader.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function NotLoggedInHeader() {
    const pathname = usePathname();
    return (
        <header className={styles.header}>
            <div className={styles.header_logo}></div>
            <nav className={styles.header_nav}>
                <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/">
                    Home
                </Link>
                <Link className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`} href="/about">
                    About
                </Link>
                <Link className={`${styles.link} ${pathname === '/login' ? styles.active : ''}`} href="/login">
                    Login
                </Link>
                <Link className={`${styles.link} ${pathname === '/signup' ? styles.active : ''}`} href="/signup">
                    SignUp
                </Link>
            </nav>
        </header>
    )
}