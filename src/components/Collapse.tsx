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
        <div className={(isOpen && !isClosing)? `${styles.collapse} ${styles.open}` : styles.collapse}>
            <header className={styles.collapse_header} onClick={isOpen ? handleClose : handleOpen}>
                <p className={styles.collapse_header_title}>{title}</p>
                <span className={styles.collapse_header_icon}>
                    <svg className={(isOpen && !isClosing) ? `${styles.rotated} ${styles.collapse_header_icon_arrow}` : styles.collapse_header_icon_arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7" version="1.1">
                        <g id="Icons" stroke="none" fill="none">
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
            </header>
            {isOpen &&
                <div className={isClosing ? `${styles.collapse_content} ${styles.closing}` : `${styles.collapse_content} ${styles.opening}`}>
                    {children}
                </div>
            }
        </div>
    )
}