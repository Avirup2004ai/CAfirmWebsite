"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingOverlay } from "./LoadingOverlay";

function LoaderController({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Show loader on route changes
        setShow(true);
        const t = window.setTimeout(() => setShow(false), 800);
        return () => window.clearTimeout(t);
    }, [pathname, searchParams, setShow]);

    return null;
}

export function InitialLoaderGate({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(true);

    return (
        <>
            <Suspense fallback={null}>
                <LoaderController setShow={setShow} />
            </Suspense>
            <LoadingOverlay show={show} />
            {children}
        </>
    );
}
