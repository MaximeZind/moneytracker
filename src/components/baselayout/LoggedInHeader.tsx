'use client'
import styles from './LoggedInHeader.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/forms/formscomponents/SubmitButton';


export default function LoggedInHeader() {
    const pathname = usePathname();

    function handleOnClick() {
        localStorage.removeItem("token");
    }

    return (
        <header className={styles.header}>
            {/* <div className={styles.header_logo}></div> */}
            <nav className={styles.header_nav}>
                <Button url='/dashboard' value='' text='Dashboard'/>
                <Button url='/dashboard/transactions' value='' text='Transactions'/>
                <Button url='/dashboard/accounts' value='' text='Accounts'/>
                <Button url='/dashboard/settings' value='' text='Settings'/>
                <Button onClick={handleOnClick} value='' text='Settings'/>
                
                {/* <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/dashboard">
                    Overview
                </Link>
                <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/dashboard/transactions">
                    Transactions
                </Link>
                <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/dashboard/accounts">
                    Accounts
                </Link>
                <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/dashboard/settings">
                    Settings
                </Link>
                <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/" onClick={handleOnClick}>
                    Sign out
                </Link> */}
            </nav>
        </header>
    )
}