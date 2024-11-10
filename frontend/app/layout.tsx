import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ReactQueryClientProvider } from "@/providers/react-query-client-provider";
import { FormStoreProvider } from "@/providers/intake-form-store-provider";

const defaultUrl = "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ReactQueryClientProvider>
          <FormStoreProvider>
            <main className="h-screen w-screen">{children}</main>
          </FormStoreProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
