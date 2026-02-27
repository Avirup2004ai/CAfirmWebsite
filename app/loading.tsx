import { SandyLoader } from "@/components/SandyLoader";

export default function Loading() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <SandyLoader label="Loading page…" size={130} />
        </div>
    );
}
