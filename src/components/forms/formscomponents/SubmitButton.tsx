import React, { MouseEventHandler } from 'react';
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
    value: string;
    text: string;
    onClick?: MouseEventHandler;
}

export default function Button({ value, text, onClick }: SubmitButtonProps) {
    return (
        <button className={styles.button} value={value} onClick={onClick}>{text}</button>
    );
}
