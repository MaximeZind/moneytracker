'use client'

import { useEffect, useState } from 'react';
import styles from "./TransactionsRightSection.module.css";
import { getCategories } from '@/app/services/categories';
import CategoriesBox from '../CategoriesBox';
import { Category } from '@prisma/client';
import Button from '../forms/formscomponents/SubmitButton';


export default function TransactionsRightSection() {

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
        <section className={styles.transactions_right_section}>
            <h1>filters</h1>
            <Button value='' text='Add Transaction' url='/dashboard/transactions/add'/>
            <CategoriesBox categories={categories} refresh={refresh}/>
        </section>
    )
}