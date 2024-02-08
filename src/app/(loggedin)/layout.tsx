import { useEffect } from "react"
import LoggedInHeader from "../components/baselayout/LoggedInHeader"

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {

    // useEffect(() => {
    //     (async () => {
    //         const user = await 
    //     })
    // })
    return (
        <>
            <LoggedInHeader />
            {children}
        </>

    )
}