"use client";
import { usePathname } from "next/navigation";

export default function ClientPathChecker({ children }: { children: (shouldHideLayout: boolean) => React.ReactNode }) {
    const pathname = usePathname();
    const shouldHideLayout = ["/login", "/register"].includes(pathname);

    return <>{children(shouldHideLayout)}</>;
}
