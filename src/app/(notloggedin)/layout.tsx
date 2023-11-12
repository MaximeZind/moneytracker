import NotLoggedInHeader from "../components/baselayout/NotLoggedInHeader"

export default function NotLoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NotLoggedInHeader />
            {children}
        </>

    )
}