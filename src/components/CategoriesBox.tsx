import styles from "./CategoriesBox.module.css";
import { Category } from "@/types/global";
import NewCategoryForm from "./forms/NewCategoryForm";
import CategoryItem from "./CategoryItem";

interface Props {
    categories: Category[];
    refresh: Function;
}

export default function CategoriesBox({ categories, refresh }: Props) {

    return (
        <div className={styles.categories_box}>
            <NewCategoryForm categories={categories} refresh={refresh}/>
            {categories.map((category, index) => {
                return (
                    <CategoryItem key={index} category={category} />
                )
            })}
        </div>
    )
}