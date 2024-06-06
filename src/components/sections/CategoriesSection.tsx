'use client'

import { useEffect, useState } from 'react';
import styles from "./CategoriesSection.module.css";
import { getCategories } from '@/app/services/categories';
import CategoriesBox from '../CategoriesBox';
import { Category } from '@prisma/client';


export default function CategoriesSection() {

    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        await getCategories().then((response) => {
            setCategories(response);
        });
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    function refresh (list: Category[]) {        
        setCategories(list);
    }
    
    return (
        categories &&
        <section className={styles.update_transaction_section}>
            <CategoriesBox categories={categories} refresh={refresh}/>
        </section>
    )
}