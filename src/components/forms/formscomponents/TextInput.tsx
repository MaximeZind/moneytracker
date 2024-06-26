import React, { ChangeEvent } from 'react';
import styles from "./TextInput.module.css";

interface TextInputProps {
    name: string;
    type: string;
    label: string;
    errorMsg?: string;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ name, type, label, errorMsg, defaultValue, onChange }: TextInputProps) {
    return (
        <div className={styles.textinput_container}>
            <label className={errorMsg ? `${styles.textinput_label} ${styles.error}` : styles.textinput_label} htmlFor={name}>{label}</label>
            <input
                className={styles.textinput_field}
                type={type}
                name={name}
                id={name}
                defaultValue={defaultValue}
                onChange={onChange ? (e) => onChange(e) : undefined}
            />
            {errorMsg && <p className={styles.error_msg}>{errorMsg}</p>}
        </div>
    );
}
