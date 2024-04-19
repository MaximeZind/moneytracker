import styles from "./CategoriesBox.module.css";
import { Category } from "@/types/global";
import NewCategoryForm from "./forms/NewCategoryForm";
import TextInput from "./forms/formscomponents/TextInput";
import Button from "./forms/formscomponents/SubmitButton";

interface Props {
    categories: Category[];
    refresh: Function;
}

export default function CategoriesBox({ categories, refresh }: Props) {


    function handleOnClick() {
        console.log('hello');
        refresh();
    }
    return (
        <div className={styles.categories_box}>
            <NewCategoryForm categories={categories} refresh={refresh}/>
            {categories.map((category, index) => {
                return (
                    <p key={index}>{category.name}</p>
                )
            })}
        </div>
    )
}