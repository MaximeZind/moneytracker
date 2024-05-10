'use client'

import styles from "./SettingsItem.module.css";
import Pencil from '@/components/table/Pencil';
import { FormEvent, useState } from "react";
import TextInput from "./forms/formscomponents/TextInput";
import Button from "./forms/formscomponents/SubmitButton";
import { updateSettings } from '@/app/services/settings';
import SelectInput from "./forms/formscomponents/SelectInput";
import currencies from '@/data/currencies.json';
import { updateuser } from "@/app/services/user";
import { useRouter } from 'next/navigation'

interface SettingsItemProps {
    title: string;
    content: string | number | Date | Boolean;
    label: string;
    currency?: string;
}

export default function SettingsItem({ title, content, label, currency }: SettingsItemProps) {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(content);
    const router = useRouter()


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
        if (label === 'password' || 'email' || 'username') {
            console.log(label);
            updateuser(formJson).then((response) => {
                const status = response.status;
                if (status === 200) {
                    router.refresh();
                    setUpdatedContent(response.data[label]);
                    setIsFormOpen(false);
                } else if (status !== 200) {
                    console.log(response.message);
                }
            })
        } else if (label !== 'password' || 'email' || 'username') {
            updateSettings(formJson).then((response) => {
                const status = response.status;
                if (status === 200) {
                    router.refresh();
                    setUpdatedContent(response.data[label]);
                    setIsFormOpen(false);
                } else if (status !== 200) {
                    console.log(response.message);
                }
            })
        }
    }

    function renderLabel(string: string) {
        // Renders the value of each field depending on the label
        switch (string) {
            case 'username':
                if (typeof (updatedContent) === 'string') {
                    return <p>{updatedContent}</p>
                }
            case 'email':
                if (typeof (updatedContent) === 'string') {
                    return <p>{updatedContent}</p>
                }
            case 'password':
                return <p>********</p>
            case 'amountGoal':
                if (typeof (updatedContent) === 'number') {
                    return <p>{currency}{updatedContent.toLocaleString()}</p>
                }
            case 'goalDate':
                if (updatedContent instanceof Date) {
                    return <p>{updatedContent.toDateString()}</p>
                }
            case 'darkMode':
                if (typeof (updatedContent) === 'boolean') {
                    return <p>{updatedContent === true ? 'ON' : 'OFF'}</p>
                }
            case 'currency':
                if (typeof (updatedContent) === 'string') {
                    return <p>{updatedContent}</p>
                }
        }
    }

    function renderForm(string: string) {
        // Renders the form depending on the label
        switch (string) {
            case 'username':
                if (typeof (updatedContent) === 'string') {
                    return <TextInput label={modifiedTitle} type='text' name={label} defaultValue={updatedContent} />
                }
            case 'email':
                if (typeof (updatedContent) === 'string') {
                    return <TextInput label={modifiedTitle} type='text' name={label} defaultValue={updatedContent} />
                }
            case 'password':
                if (typeof (updatedContent) === 'string') {
                    return <TextInput label={modifiedTitle} type='password' name={label} defaultValue={updatedContent} />
                }
            case 'amountGoal':
                if (typeof (updatedContent) === 'number') {
                    return <TextInput label={modifiedTitle} type='number' name={label} defaultValue={updatedContent} />
                }
            case 'goalDate':
                if (updatedContent instanceof Date) {
                    return <input type="date" name={label} id={label} className={styles.date_input} defaultValue={updatedContent.toLocaleDateString('en-CA')} />
                }
            case 'darkMode':
                if (typeof (updatedContent) === 'boolean') {
                    return <>
                        <input type="checkbox" id={label} name={label} defaultChecked={updatedContent} />
                        <label htmlFor={label}>{title}</label>
                    </>
                }
            case 'currency':
                if (typeof (updatedContent) === 'string') {
                    return <SelectInput name={title} label={label} options={currencies} />
                }
        }
    }

    return (
        <div className={styles.settings_item}>
            <div className={styles.settings_item_text} style={{
                width: isFormOpen ? '100%' : 'auto'
            }}>
                {
                    isFormOpen ?
                        <form className={styles.settings_item_update_form} onSubmit={handleFormSubmit}>
                            {
                                renderForm(label)
                            }
                            <div className={styles.buttons}>
                                <Button value="submit" text="Update" />
                                <Button value="" text="Cancel" onClick={() => setIsFormOpen(false)} />
                            </div>
                        </form>
                        : <div>
                            <strong>{`${modifiedTitle}:`}</strong>
                            {renderLabel(label)}
                        </div>
                }
            </div>
            {
                !isFormOpen && <Pencil openModal={handleClickPencil} />
            }
        </div>
    )
}