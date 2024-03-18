import React, { ChangeEvent, useState } from 'react';
import styles from "./SelectInput.module.css";

interface SelectInputProps {
    name: string;
    options: string[] | number[];
    label?: string;
    errorMsg?: string;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectInput({ name, label, options, errorMsg, defaultValue, onChange }: SelectInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | number | null>(defaultValue ? defaultValue : null);

    const handleOptionClick = (optionValue: string | number) => {
        setSelectedValue(optionValue);
        setIsOpen(false); // Optionally close the selection box upon selection
        if (onChange) {
            // Fake an input change event if an onChange handler is provided
            const fakeEvent = {
                target: { name, value: optionValue },
            } as unknown as ChangeEvent<HTMLInputElement>;
            onChange(fakeEvent);
        }
    };

    function handleClick() {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false)
                setIsOpen(false);
            }, 300);
        } else if (!isOpen) {
            setIsOpen(true);
        }
    }

    return (
        <div className={styles.select_container}>
            <label className={errorMsg ? `${styles.select_label} ${styles.error}` : styles.select_label} htmlFor={name}>{label}</label>
            <div className={isOpen ? `${styles.select_box} ${styles.open}` : styles.select_box} onClick={handleClick}>
                <p className={styles.select_box_selected_value}>{selectedValue ? selectedValue : "Select an option"}</p>
                <span className={(isOpen || isClosing) ? `${styles.arrow} ${styles.rotated}` : styles.arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="7px" viewBox="0 0 12 7" version="1.1">
                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Rounded" transform="translate(-616.000000, -2467.000000)">
                                <g id="Hardware" transform="translate(100.000000, 2404.000000)">
                                    <g id="-Round-/-Hardware-/-keyboard_arrow_down" transform="translate(510.000000, 54.000000)">
                                        <g>
                                            <rect id="Rectangle-Copy-103" x="0" y="0" width="24" height="24" />
                                            <path d="M8.12,9.29 L12,13.17 L15.88,9.29 C16.27,8.9 16.9,8.9 17.29,9.29 C17.68,9.68 17.68,10.31 17.29,10.7 L12.7,15.29 C12.31,15.68 11.68,15.68 11.29,15.29 L6.7,10.7 C6.31,10.31 6.31,9.68 6.7,9.29 C7.09,8.91 7.73,8.9 8.12,9.29 Z" id="🔹-Icon-Color" fill="#1D1D1D" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>
            </div>
            <div className={styles.selection_box_wrapper}>
                {isOpen && (
                    <div className={isClosing ? `${styles.selection_box} ${styles.closing}` : styles.selection_box}>
                        {options.map((option, index) => (
                            <span key={index} className={styles.selection_box_option}
                                onClick={() => handleOptionClick(option)}>
                                {option}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {errorMsg && <p className={styles.error_msg}>{errorMsg}</p>}
        </div>
    );
}