import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { UserCuisinePreferencesProvider } from "@/hooks/useUserCuisinePreferences";

const figtree = Figtree({ subsets: ["latin"], adjustFontFallback: false });

export const metadata: Metadata = {
    title: "Gourmet Guide",
    description: "A guide to the best restaurants in the world.",
};

// rooooooooooot
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <UserCuisinePreferencesProvider>
                <html lang="en">
                    <body
                        className={cn("relative h-full font-sans antialiased", figtree.className)}>
                        <main className="relative flex flex-col min-h-screen">
                            <div className="flex-grow flex-1">
                                <Toaster />
                                <Navbar />
                                {children}
                            </div>
                        </main>
                    </body>
                </html>
            </UserCuisinePreferencesProvider>
        </SessionProvider>
    );
}
