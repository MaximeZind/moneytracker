'use client';
import styles from './LoggedInHeader.module.css';
import Button from '@/components/forms/formscomponents/SubmitButton';
import { signOut } from '@/app/services/signout';
import { useRouter } from 'next/navigation';


export default function LoggedInHeader() {
    const router = useRouter();

    function handleOnClick() {
        signOut();
        router.push('/login');
    }

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <Button url='/dashboard' value='' text='Dashboard' />
                <Button url='/dashboard/transactions' value='' text='Transactions' />
                <Button url='/dashboard/accounts' value='' text='Accounts' />
                <Button url='/dashboard/settings' value='' text='Settings' />
                <Button onClick={handleOnClick} value='' text='Sign Out' />
            </nav>
        </header>
    )
}