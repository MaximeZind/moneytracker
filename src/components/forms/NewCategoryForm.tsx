import styles from "./NewCategoryForm.module.css";
import { Category } from "@/types/global";
import TextInput from "../forms/formscomponents/TextInput";
import Button from "../forms/formscomponents/SubmitButton";
import { FormEvent } from "react";
import { newCategory } from "@/app/services/categories";

interface Props {
    categories: Category[];
    refresh: Function;
}


export default function NewCategoryForm({ categories, refresh }: Props) {


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const newCat = formData.get('newCategory') as string;
        const updatedCategories = newCategory(newCat);
        updatedCategories.then((response) => {
            const responseStatus = response.response.status;
            const responseDatas = response.response.data;
            if (responseStatus === 200) {
                refresh(responseDatas);
            }
        })
    }
    return (
        <form
            className={styles.new_category_form}
            onSubmit={handleSubmit}
        >
            <TextInput name="newCategory" type="text" label="New Category" />
            <Button value="submit" text="Add" />
        </form>
    )
}