import styles from "./CategoryItem.module.css";
import { Category } from "@/types/global";
import Garbage from "./table/Garbage";
import Pencil from "./table/Pencil";
import { FormEvent, useState } from "react";
import Modal from "./Modal";
import Button from "./forms/formscomponents/SubmitButton";
import TextInput from "./forms/formscomponents/TextInput";
import { updateCategory } from "@/app/services/categories";

interface Props {
    category: Category;
}

export default function CategoryItem({ category }: Props) {

    const [modalContent, setModalContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function closeModal() {
        setModalContent('');
    }

    function openModal(string: string) {
        setModalContent(string);
    }

    function handleDeleteCategory(id: string) {
        console.log(id);

    }


    async function handleEditCategory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const updatedName = formData.get("name") as string;
        const categoryToUpdate = { name: updatedName, id: category.id };
        updateCategory(categoryToUpdate).then((response) => {
            const responseStatus = response.status;
            if (responseStatus === 200) {
                window.location.reload();
            }
        });
    }
    return (
        <>
            {
                isEditing ?
                    <>
                        <form className={styles.category_edit_form} onSubmit={handleEditCategory}>
                            <TextInput name="name" type="text" defaultValue={category.name} label="" />
                            <Button text="Save" value="submit" />
                            <Button text="Cancel" value="" onClick={() => setIsEditing(false)} />
                        </form>
                    </>
                    :
                    <div className={styles.category_item}>
                        <p>{category.name}</p>
                        <div className={styles.icons}>
                            <Pencil openModal={() => setIsEditing(true)} />
                            <Garbage openModal={openModal} />
                        </div>
                    </div>
            }
            {
                modalContent === 'delete' &&
                <Modal closeModal={closeModal}>
                    <div className={styles.modal_content}>
                        <p>{`Do you really want to ${modalContent} this transaction?`}</p>
                        <Button text="Yes" value="none" onClick={() => handleDeleteCategory(category.id)} />
                        <Button text="Cancel" value="none" onClick={closeModal} />
                    </div>
                </Modal>
            }
        </>

    )
}
