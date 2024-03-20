import React, { ChangeEvent, useEffect, useState, RefObject, useRef } from 'react';
import styles from "./SelectInput.module.css";

interface SelectInputProps {
    name: string;
    options: string[] | number[] | Option[];
    label?: string;
    errorMsg?: string;
    defaultValue?: string;
    defaultDisplayedValue?: string;
    onChange?: Function;
}

interface Option {
    name: string;
    id: string;
}

export default function SelectInput({ name, label, options, errorMsg, defaultValue, defaultDisplayedValue, onChange }: SelectInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | number | null>(defaultValue ? defaultValue : null);
    const [displayedValue, setDisplayedValue] = useState<string | number | null>(defaultValue ? defaultValue : null);
    const dropdownMenu: RefObject<HTMLDivElement> = useRef(null)


    const handleOptionClick = (optionValue: string | number, name?: string) => {
        setSelectedValue(optionValue);
        setDisplayedValue(name ? name : optionValue);
        // setIsOpen(false); // Optionally close the selection box upon selection
        close();
        if (onChange) {
            onChange(optionValue);
        }
    };

    function handleClick() {
        if (isOpen) {
            close();
        } else if (!isOpen) {
            open();
        }
    }

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false)
            setIsOpen(false);
        }, 300);
    }

    function handleClickOutside(event:Event) {
        if (event.target !== null) {
            if (isOpen && dropdownMenu.current && !dropdownMenu.current.contains(event.target as Node)) {
                close();
            }
        }

    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.select_container} ref={dropdownMenu}>
            <label className={errorMsg ? `${styles.select_label} ${styles.error}` : styles.select_label} htmlFor={name}>{label}</label>
            <input className={styles.hidden} name={name} id={name} readOnly value={selectedValue ? selectedValue : ""}></input>
            <div className={isOpen ? `${styles.select_box} ${styles.open}` : styles.select_box} onClick={handleClick}>
                <p className={styles.select_box_selected_value}>{displayedValue ? displayedValue : "Select an option"}</p>
                <span className={(isOpen && !isClosing) ? `${styles.arrow} ${styles.rotated}` : styles.arrow}>
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
                            typeof option === 'string' || typeof option === 'number' ? (
                                <span key={index} className={styles.selection_box_option} onClick={() => handleOptionClick(option)}>
                                    {option}
                                </span>
                            ) :
                                <span key={index} className={styles.selection_box_option} onClick={() => handleOptionClick(option.id, option.name)}>
                                    {option.name}
                                </span>
                        ))}
                    </div>
                )}
            </div>
            {errorMsg && <p className={styles.error_msg}>{errorMsg}</p>}
        </div>
    );
}