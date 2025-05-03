import { Outlet } from "react-router";
import { NavLinkExample } from "./NavLinkExample";

export default function Layout() {
    return (
        <>
            <NavLinkExample />
            <Outlet />
        </>
    )
}