'use client'

import Link from "next/link";
import styles from "./LoginForm.module.css";
import { FormEvent, useState } from 'react';
import { LoginData, LoginUser } from '../../app/services/login';
import TextInput from "./formscomponents/TextInput";
import SubmitButton from "./formscomponents/SubmitButton";
import { useRouter } from 'next/navigation';
import { validateLogin } from "@/utils/formValidation";


export default function Login() {
    const router = useRouter();

    const [usernameErrorMsg, setUsernameErrorMsg] = useState<null | string>(null);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<null | string>(null);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    function handleErrorMsgs(errorMsgs: {
        username: null | string,
        password: null | string,
    }) {

        const setters = {
            username: setUsernameErrorMsg,
            password: setPasswordErrorMsg,
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
        setErrorMsg(null);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: LoginData = Object.fromEntries(formData.entries()) as unknown as LoginData;
        const verification = validateLogin(formJson);
        deleteErrorMsgs();
        if (verification.isValid) {
            const loginResponse = LoginUser(formJson);
            loginResponse.then((response) => {
                console.log(response);
                const status = response.response.status;
                if (status === 200) {
                    router.push('/dashboard');
                } else if (status !== 200) {
                    const message = response.response.message;
                    setErrorMsg(message)
                }
            })
        } else if (!verification.isValid) {
            handleErrorMsgs(verification.errorMsg);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login_form}>
            <TextInput name="username" type="text" label="Username" errorMsg={usernameErrorMsg} />
            <TextInput name="password" type="password" label="Password" errorMsg={passwordErrorMsg} />
            {
                errorMsg && <p className={styles.error}>{errorMsg}</p>
            }
            <SubmitButton value='submit' text='Submit' />
            <p>You don&apos;t have an account yet? <Link href={"/signup"}>Sign Up!</Link></p>
        </form>
    )
}
