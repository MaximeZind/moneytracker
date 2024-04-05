import React, { ChangeEvent } from 'react';
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
    value: string;
    text: string;
}

export default function TextInput({ value, text }: SubmitButtonProps) {
    return (
        <button className={styles.button} value={value}>{text}</button>
    );
}
