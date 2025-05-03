export const Button = ({
    label,
    backgroundColor = 'blue',
    children
}: {
    label: string,
    backgroundColor?: string,
    children?: React.ReactNode
}) => {
    return <button className="button">
        {children != null ? children : label}
    </button >
}