export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Hero skeleton */}
            <div className="gradient-bg">
                <div className="section-container flex flex-col items-center py-20 text-center lg:py-28">
                    <div className="h-6 w-48 rounded-full bg-primary-100" />
                    <div className="mt-6 h-12 w-full max-w-3xl rounded-lg bg-neutral-200" />
                    <div className="mt-4 h-12 w-full max-w-2xl rounded-lg bg-neutral-200" />
                    <div className="mt-6 h-6 w-full max-w-xl rounded bg-neutral-100" />
                    <div className="mt-8 flex gap-3">
                        <div className="h-12 w-44 rounded-lg bg-primary-200" />
                        <div className="h-12 w-36 rounded-lg bg-accent-200" />
                    </div>
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="border-y border-neutral-200 bg-white">
                <div className="section-container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="h-8 w-20 rounded bg-neutral-200" />
                            <div className="h-4 w-28 rounded bg-neutral-100" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Cards skeleton */}
            <div className="section-padding bg-neutral-50">
                <div className="section-container">
                    <div className="mx-auto h-8 w-48 rounded bg-neutral-200" />
                    <div className="mx-auto mt-3 h-5 w-96 rounded bg-neutral-100" />
                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6">
                                <div className="h-12 w-12 rounded-xl bg-neutral-200" />
                                <div className="mt-4 h-5 w-2/3 rounded bg-neutral-200" />
                                <div className="mt-3 h-4 w-full rounded bg-neutral-100" />
                                <div className="mt-2 h-4 w-4/5 rounded bg-neutral-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
