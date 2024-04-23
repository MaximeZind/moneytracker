'use client'

import { useEffect, useState } from 'react';
import styles from "./TransactionsLeftSection.module.css";
import { getCategories } from '@/app/services/categories';
import CategoriesBox from '../CategoriesBox';
import { Category } from '@prisma/client';
import Button from '../forms/formscomponents/SubmitButton';


export default function TransactionsLeftSection() {

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
    console.log(categories);
    
    return (
        categories &&
        <section className={styles.transactions_left_section}>
            <Button value='' text='Add Transaction' url='/dashboard/transactions/add'/>
            <h1>Categories</h1>
            <CategoriesBox categories={categories} refresh={refresh}/>
        </section>
    )
}