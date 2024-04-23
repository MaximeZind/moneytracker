import React, { MouseEventHandler } from 'react';
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
    value: string;
    text: string;
    onClick?: MouseEventHandler;
    url?: string;
}

export default function Button({ value, text, onClick, url }: SubmitButtonProps) {

    function handleOnClick(string: string) {

    }
    return (
        url ?
            <a href={url}>
                <button className={styles.button} value={value}>{text}</button>
            </a> :
            <button className={styles.button} value={value} onClick={onClick}>{text}</button>
    );
}
