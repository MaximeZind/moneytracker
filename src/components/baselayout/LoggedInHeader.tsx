'use client';
import styles from './LoggedInHeader.module.css';
import Button from '@/components/forms/formscomponents/SubmitButton';
import { signOut } from '@/app/services/signout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function LoggedInHeader() {
    const router = useRouter();

    function handleOnClick() {
        signOut();
        router.push('/login');
    }
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={isOpen ? `${styles.header} ${styles.open}` : `${styles.header}`}>
            <div className={isOpen ? `${styles.burger_menu} ${styles.open}` : `${styles.burger_menu}`}
                onClick={() => setIsOpen(!isOpen)}>
                <span className={`${styles.burger_menu_bar} ${styles.top_bar}`}></span>
                <span className={`${styles.burger_menu_bar} ${styles.middle_bar}`}></span>
                <span className={`${styles.burger_menu_bar} ${styles.bottom_bar}`}></span>
            </div>
            <nav className={isOpen ? `${styles.header_nav} ${styles.open}` : `${styles.header_nav}`}>
                <Button url='/dashboard' value='' text='Dashboard' />
                <Button url='/dashboard/transactions' value='' text='Transactions' />
                <Button url='/dashboard/transactions/add' value='' text='Add Transaction' />
                <Button url='/dashboard/accounts' value='' text='Accounts' />
                <Button url='/dashboard/categories' value='' text='Categories' />
                <Button url='/dashboard/settings' value='' text='Settings' />
                <Button onClick={handleOnClick} value='' text='Sign Out' />
            </nav>
        </header>
    )
}