import LoggedInHeader from "../components/baselayout/LoggedInHeader"

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