'use client'

import styles from "./SettingsItem.module.css";
import Pencil from '@/components/table/Pencil';
import { User } from '@/types/global';
import { FormEvent, useState } from "react";
import TextInput from "./forms/formscomponents/TextInput";
import Button from "./forms/formscomponents/SubmitButton";
import { updateSettings } from '@/app/services/settings';
import SelectInput from "./forms/formscomponents/SelectInput";
import currencies from '@/data/currencies.json';

interface SettingsItemProps {
    title: string;
    content: string | number | Date | Boolean;
    label: string;
}

export default function SettingsItem({ title, content, label}: SettingsItemProps) {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const modifiedTitle = `${title[0].toUpperCase()}${title.slice(1)}`;

    function handleClickPencil() {
        setIsFormOpen(true)
    }

    function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const updateForm = event.target as HTMLFormElement;
        const darkModeCheckbox = updateForm.querySelector<HTMLInputElement>('#darkMode');
        let formJson = {};
        if (darkModeCheckbox) {
            formJson = {
                darkMode: darkModeCheckbox.checked
            }
        } else if (!darkModeCheckbox) {
            const formData = new FormData(updateForm);
            formJson = Object.fromEntries(formData.entries());
        }
        updateSettings(formJson).then((response) => {
            const status = response.status;
            if (status === 200) {
                window.location.reload();
            } else if (status !== 200) {
                console.log(response.message);
            }
        })
    }

    function renderLabel(string: string) {
        // Renders the value of each field depending on the label
        switch (string) {
            case 'username':
                if (typeof (content) === 'string') {
                    return <p>{content}</p>
                }
            case 'email':
                if (typeof (content) === 'string') {
                    return <p>{content}</p>
                }
            case 'password':
                return <p>********</p>
            case 'amountGoal':
                if (typeof (content) === 'number') {
                    return <p>{content.toLocaleString()}</p>
                }
            case 'goalDate':
                if (content instanceof Date) {
                    return <p>{content.toDateString()}</p>
                }
            case 'darkMode':
                if (typeof (content) === 'boolean') {
                    return <p>{content === true ? 'ON' : 'OFF'}</p>
                }
            case 'currency':
                if (typeof (content) === 'string') {
                    return <p>{content}</p>
                }
        }
    }

    function renderForm(string: string) {
        // Renders the form depending on the label
        switch (string) {
            case 'username':
                if (typeof (content) === 'string') {
                    return <TextInput label={modifiedTitle} type='text' name={label} defaultValue={content} />
                }
            case 'email':
                if (typeof (content) === 'string') {
                    return <TextInput label={modifiedTitle} type='text' name={label} defaultValue={content} />
                }
            case 'password':
                if (typeof (content) === 'string') {
                    return <TextInput label={modifiedTitle} type='password' name={label} defaultValue={content} />
                }
            case 'amountGoal':
                if (typeof (content) === 'number') {
                    return <TextInput label={modifiedTitle} type='number' name={label} defaultValue={content} />
                }
            case 'goalDate':
                if (content instanceof Date) {
                    return <input type="date" name={label} id={label} className={styles.date_input} defaultValue={content.toLocaleDateString('en-CA')} />
                }
            case 'darkMode':
                if (typeof (content) === 'boolean') {
                    return <>
                        <input type="checkbox" id={label} name={label} defaultChecked={content} />
                        <label htmlFor={label}>{title}</label>
                    </>
                }
            case 'currency':
                if (typeof (content) === 'string') {
                    return <SelectInput name={title} label={label} options={currencies} />
                }
        }
    }

    return (
        <div className={styles.settings_item}>
            <div className={styles.settings_item_text}>
                {
                    isFormOpen ?
                        <form onSubmit={handleFormSubmit}>
                            {
                                renderForm(label)
                            }
                            <div className={styles.buttons}>
                                <Button value="submit" text="Update" />
                                <Button value="" text="Cancel" onClick={() => setIsFormOpen(false)} />
                            </div>
                        </form>
                        :<div>
                            <strong>{`${modifiedTitle}:`}</strong>
                            {renderLabel(label)}
                        </div>
                }
            </div>
            <Pencil openModal={handleClickPencil} />
        </div>
    )
}