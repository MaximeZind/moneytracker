import LoggedInHeader from "../components/baselayout/NotLoggedInHeader"

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <LoggedInHeader />
            {children}
        </>

    )
}