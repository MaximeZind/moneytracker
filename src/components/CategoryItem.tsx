import styles from "./CategoriesBox.module.css";
import { Category } from "@/types/global";
import Garbage from "./table/Garbage";
import Pencil from "./table/Pencil";
import { useState } from "react";
import Modal from "./Modal";
import Button from "./forms/formscomponents/SubmitButton";

interface Props {
    category: Category;
}

export default function CategoriesBox({ category }: Props) {

    const [modalContent, setModalContent] = useState('');

    function closeModal() {
        setModalContent('');
    }

    function openModal(string: string) {
        setModalContent(string);
    }
    return (
        <>
            <div className={styles.category_item}>
                <p>{category.name}</p>
                <div className={styles.icons}>
                    <Pencil openModal={openModal} />
                    <Garbage openModal={openModal} />
                </div>
            </div>
            {
                (modalContent === 'edit' || modalContent === 'delete') && (
                    <Modal closeModal={closeModal}>
                        <div className={styles.modal_content}>
                            <p>{`Do you really want to ${modalContent} this transaction?`}</p>
                            <div className={styles.modal_buttons}>
                                {/* {modalContent === 'edit' && <a href={`/dashboard/transactions/edit/${transaction.id}`}><Button text="Yes" value="none" /></a>}
                                {modalContent === 'delete' && <Button text="Yes" value="none" onClick={() => handleDeleteTransaction(transaction.id)} />} */}
                                <Button text="Cancel" value="none" onClick={closeModal} />
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>

    )
}