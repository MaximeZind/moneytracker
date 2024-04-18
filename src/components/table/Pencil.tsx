import { MouseEventHandler, useState } from "react";
import styles from "./Pencil.module.css";
import Modal from "@/components/Modal";
import Button from "@/components/forms/formscomponents/SubmitButton";

interface TableProps {
    openModal: (string: string) => void;
}


export default function Pencil({ openModal }: TableProps) {

    function handleClick() {
        openModal("edit");
    }

    return (
        <span className={styles.pencil} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="Layer_27" data-name="Layer 27"><path d="M50.94,50.5H12a1.5,1.5,0,0,0,0,3H50.94A1.5,1.5,0,0,0,50.94,50.5Z" /><path d="M51.68,12.38h0c-2.83-2.83-7.88-2.39-11.26,1L20.24,33.55a1.47,1.47,0,0,0-.39.67l-3,11.16a1.51,1.51,0,0,0,1.84,1.83l11.15-3a1.4,1.4,0,0,0,.67-.38L47.86,26.46l2.83-2.83C53.75,20.71,54.75,15.4,51.68,12.38Z" /></g></svg>
        </span>
    )
}