'use client'

import { deleteUsers } from "@/app/services/deleteUsers";
import { SignUpData, signUpUser } from "@/app/services/signup";
import { getUsers } from "@/app/services/users";
import styles from "./SignUpForm.module.css";
import { FormEvent, useState } from 'react';
import TextInput from "./formscomponents/TextInput";
import Button from "./formscomponents/SubmitButton";
import { validateSignUp } from "@/utils/formValidation";
import { useRouter } from 'next/navigation';

export default function SignUp() {

    // Handling of the error messages

    const [usernameErrorMsg, setUsernameErrorMsg] = useState<null | string>(null);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<null | string>(null);
    const [emailErrorMsg, setEmailErrorMsg] = useState<null | string>(null);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    const router = useRouter();


    function handleErrorMsgs(errorMsgs: {
        username: null | string,
        password: null | string,
        email: null | string,
    }) {

        const setters = {
            username: setUsernameErrorMsg,
            password: setPasswordErrorMsg,
            email: setEmailErrorMsg,
        };

        Object.entries(errorMsgs).map(([field, errorMsg]) => {
            const setter = setters[field as keyof typeof setters];
            if (setter) {
                setter(errorMsg);
            }
        });
    }

    function deleteErrorMsgs() {
        setUsernameErrorMsg(null);
        setPasswordErrorMsg(null);
        setEmailErrorMsg(null);
        setErrorMsg(null);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: SignUpData = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };
        deleteErrorMsgs();
        const verification = validateSignUp(formJson);
        if (verification.isValid) {
            signUpUser(formJson).then((response) => {
                const status = response.response.status;
                if (status !== 200) {
                    setErrorMsg(response.response.message);
                } else if (status === 200) {
                    router.push('/dashboard');
                }
            });
        } else if (!verification.isValid) {
            handleErrorMsgs(verification.errorMsg);
        }
    }

    function handleDeleteUsers(event: any) {
        event.preventDefault();
        deleteUsers();
    }

    async function handleGetUsers(event: any) {
        event.preventDefault();
        const users = await getUsers();
        console.log(users);

    }    
    return (
        <>
            <form className={styles.submit_form} onSubmit={handleSubmit}>
                <TextInput name="username" type="text" label="Username" errorMsg={usernameErrorMsg} />
                <TextInput name="email" type="text" label="Email" errorMsg={emailErrorMsg} />
                <TextInput name="password" type="password" label="Password" errorMsg={passwordErrorMsg} />
                <Button value='submit' text='Submit' />
                {errorMsg && <p className={styles.error_msg}>{errorMsg}</p>}
            </form>
            <button onClick={handleDeleteUsers}>Delete Users</button>
            <button onClick={handleGetUsers}>Get Users</button>
        </>
    )
}
