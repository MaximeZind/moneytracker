'use client'

import { useState } from "react";
import styles from "./AccountsSection.module.css";
import Link from "next/link";
import AccountPreview from "../AccountPreview";
import { Account, Category } from "@/types/global";
import Button from "../forms/formscomponents/SubmitButton";
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
            {
                accounts.length === 0 ?
                    <div className={styles.empty_accounts_list_message}>
                        <p>{`It looks like you haven't added any transaction yet! Click on the button below to get started:`}</p>
                        <Button url="/dashboard/accounts/newaccount" text="Create a new account" value="" />
                    </div> :
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
                        <Button url="/dashboard/accounts/newaccount" text="Create a new account" value="" />
                    </section>
            }

        </section>
    )
}
