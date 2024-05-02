'use client'

import styles from "./SettingsItem.module.css";
import Pencil from '@/components/table/Pencil';
import { User } from '@/types/global';
import Modal from '@/components/Modal';
import { FormEvent, useState } from "react";
import TextInput from "./forms/formscomponents/TextInput";
import Button from "./forms/formscomponents/SubmitButton";
require('dotenv').config();

interface SettingsSignInItemProps {
    title: string;
    content: string;
    user: User;
}

export default function SettingsSignInItem({ title, content, user }: SettingsSignInItemProps) {

    const [isModal, setIsModal] = useState(false);
    const modifiedTitle = `${title[0].toUpperCase()}${title.slice(1)}`;

    function handleClickPencil() {
        setIsModal(true)
    }

    function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const updateForm = event.target as HTMLFormElement;
        const formData = new FormData(updateForm);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

    }

    return (
        <div className={styles.settings_item}>
            <strong>{modifiedTitle}:</strong>
            <p>{content}</p>
            <Pencil openModal={handleClickPencil} />
            {
                isModal &&
                <Modal closeModal={() => setIsModal(false)}>
                    <form onSubmit={handleFormSubmit}>
                        <TextInput label={modifiedTitle} type="text" name={title} defaultValue={content} />
                        <Button value="submit" text="Update" />
                    </form>
                </Modal>
            }
        </div>
    )
}