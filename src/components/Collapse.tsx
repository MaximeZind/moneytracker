import { useState } from "react";
import styles from "./Collapse.module.css";

export default function Collapse({ children, title }: {
    children: React.ReactNode;
    title: string;
}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    function handleClose() {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsOpen(false);
        }, 300)
    }

    function handleOpen() {
        setIsOpen(true);
    }

    return (
        <div className={styles.collapse}>
            <header className={styles.collapse_header} onClick={isOpen ? handleClose : handleOpen}>
                <p className={styles.collapse_header_title}>{title}</p>
                <span className={styles.collapse_header_arrow}></span>
            </header>
            {isOpen &&
                <div className={isClosing ? `${styles.collapse_content} ${styles.closing}` : `${styles.collapse_content}`}>
                    {children}
                </div>
            }
        </div>
    )
}