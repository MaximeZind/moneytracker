// 'use client'
import styles from './NotLoggedInHeader.module.css';
import Button from '../forms/formscomponents/SubmitButton';


export default function NotLoggedInHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <Button url='/' value='' text='Home' />
                <Button url='/about' value='' text='About' />
                <Button url='/login' value='' text='Log In' />
                <Button url='/signup' value='' text='Sign Up' />
            </nav>
        </header>
    )
}