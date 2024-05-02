'use client'

import styles from "./SettingsItem.module.css";
import Pencil from '@/components/table/Pencil';
import { User } from '@/types/global';
import Modal from '@/components/Modal';
import { FormEvent, useState } from "react";
import TextInput from "./forms/formscomponents/TextInput";
import Button from "./forms/formscomponents/SubmitButton";
require('dotenv').config();

interface SettingsItemProps {
    title: string;
    content: string | number | Date;
    user: User;
}

export default function SettingsItem({ title, content, user }: SettingsItemProps) {

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

    console.log(typeof (content));

    return (
        <div className={styles.settings_item}>
            <div className={styles.settings_item_text}>
                <strong>{modifiedTitle}:</strong>
                {
                    (typeof (content) === 'string') || typeof (content) === 'number' &&
                    <p>{content.toLocaleString()}</p>
                }
                {
                    (typeof (content) === 'object') &&
                    <p>{content.toDateString()}</p>
                }

            </div>
            <Pencil openModal={handleClickPencil} />
            {
                isModal &&
                <Modal closeModal={() => setIsModal(false)}>
                    <form onSubmit={handleFormSubmit}>
                        {
                            typeof (content) === 'string' &&
                            <TextInput label={modifiedTitle} type='text' name={title} defaultValue={content} />
                        }
                        {
                            typeof (content) === 'number' &&
                            <TextInput label={modifiedTitle} type='number' name={title} defaultValue={content} />
                        }
                        {
                            typeof (content) === 'object' &&
                            <input type="date" name="goalDate" id="goalDate" className={styles.date_input} />

                        }
                        <div className={styles.buttons}>
                            <Button value="submit" text="Update" />
                            <Button value="" text="Cancel" onClick={() => setIsModal(false)} />
                        </div>
                    </form>
                </Modal>
            }
        </div>
    )
}