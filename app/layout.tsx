import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import WidthCover from "@/components/WidthCover";

const figtree = Figtree({ subsets: ["latin"], adjustFontFallback: false });

export const metadata: Metadata = {
    title: "Gourmet Guide",
    description: "A guide to the best restaurants in the world.",
};

// root
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn("relative h-full font-sans antialiased", figtree.className)}>
                <main className="relative flex flex-col min-h-screen">
                    <div className="flex-grow flex-1">
                        <WidthCover>{children}</WidthCover>
                    </div>
                </main>
            </body>
        </html>
    );
}
