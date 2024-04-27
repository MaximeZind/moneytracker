'use client'

import { useState } from "react";
import styles from "./AccountsSection.module.css";
import Link from "next/link";
import AccountPreview from "../AccountPreview";
import { Account, Category } from "@/types/global";
import SubmitButton from "../forms/formscomponents/SubmitButton";
import CategoriesBox from "@/components/CategoriesBox";

interface AccountsSectionProps {
    accounts: Account[];
    categories: Category[];
}

export default function AccountsSection({ accounts, categories }: AccountsSectionProps) {

    const [categoriesList, setCategoriesList] = useState<Category[]>(categories);

    function refresh(list: Category[]) {
        setCategoriesList(list);
    }

    return (
        <section className={styles.accounts_page_section}>
            <section className={styles.categories_section}>
                <h1>Categories</h1>
                <CategoriesBox categories={categoriesList} refresh={refresh} />
            </section>
            <section className={styles.accounts_section}>
                <h1>Accounts</h1>
                <div className={styles.accounts_section_gallery}>
                    {
                        accounts && accounts.map((account: Account) => {
                            return (
                                <AccountPreview key={account.id} name={account.name} type={account.type} transactions={account.transactions} id={account.id} />
                            )
                        })
                    }

                </div>
                <Link href="/dashboard/accounts/newaccount">
                    <SubmitButton text="Create a new account" value="" />
                </Link>
            </section>

        </section>
    )
}
