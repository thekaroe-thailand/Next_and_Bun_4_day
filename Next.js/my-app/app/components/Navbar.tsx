import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className="flex gap-3">
            <Link href="/product">Product</Link>
            <Link href="/">Home</Link>
            <Link href="/employee">Employee</Link>
        </div>
    )
}