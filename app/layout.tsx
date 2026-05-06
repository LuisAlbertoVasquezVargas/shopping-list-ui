// app/layout.js

import "./globals.css";

export const metadata = {
  title: "SHOP-TERM",
  description: "Shopping List Core UI",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}