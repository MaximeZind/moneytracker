'use client'

import styles from "./SettingsItem.module.css";
import Pencil from '@/components/table/Pencil';
import { User } from '@/types/global';
import Modal from '@/components/Modal';
import { FormEvent, useState } from "react";
import TextInput from "./forms/formscomponents/TextInput";
import Button from "./forms/formscomponents/SubmitButton";
import { updateSettings } from '@/app/services/settings'
require('dotenv').config();

interface SettingsItemProps {
    title: string;
    content: string | number | Date | Boolean;
    label: string;
    user: User;
}

export default function SettingsItem({ title, content, label, user }: SettingsItemProps) {

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
        updateSettings(formJson).then((response) => {
            console.log(response);
        })
    }

    return (
        <div className={styles.settings_item}>
            <div className={styles.settings_item_text}>
                <strong>{modifiedTitle}:</strong>
                {
                    (typeof (content) === 'string') &&
                    <p>{content}</p>
                }
                {
                    (typeof (content) === 'number') &&
                    <p>{content.toLocaleString()}</p>
                }
                {
                    content instanceof Date &&
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
                            <TextInput label={modifiedTitle} type='text' name={label} defaultValue={content} />
                        }
                        {
                            typeof (content) === 'number' &&
                            <TextInput label={modifiedTitle} type='number' name={label} defaultValue={content} />
                        }
                        {
                            typeof (content) === 'object' &&
                            <input type="date" name={label} id={label} className={styles.date_input} />
                        }
                        {
                            typeof (content) === 'boolean' &&
                            <>
                                <input type="checkbox" id={label} name={label} defaultChecked={content} />
                                <label htmlFor={label}>{title}</label>
                            </>
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