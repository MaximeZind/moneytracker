import styles from "./Categories.module.css";
import CategoriesSection from "@/components/sections/CategoriesSection";

export default function Categories() {

    return (
      <section className={styles.accounts_section}>
        <h1>Categories</h1>
        <CategoriesSection/>
      </section>
    )
  }
  