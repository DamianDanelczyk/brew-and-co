import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import N8nChat from "./components/N8nChat";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brew & Co — Shoreditch Coffee",
  description:
    "A cozy specialty coffee shop in the heart of Shoreditch, London. Hand-crafted espresso drinks, seasonal pastries, and a warm community vibe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"
          rel="stylesheet"
        />
        {/* These overrides must come AFTER the CDN link to win the cascade */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            /* Core colours */
            --chat--color--primary:            #C96235;
            --chat--color--primary-shade-50:   #B55228;
            --chat--color--primary--shade-100: #8A3A1E;
            --chat--color--secondary:          #3D8B7A;
            --chat--color-secondary-shade-50:  #326F61;
            --chat--color-white:               #FFFFFF;
            --chat--color-light:               #F8F1E6;
            --chat--color-light-shade-50:      #EDD9C0;
            --chat--color-light-shade-100:     #C4A98A;
            --chat--color-medium:              #E2CBAD;
            --chat--color-dark:                #1C0F07;
            --chat--color-disabled:            #C4A98A;
            --chat--color-typing:              #6B4433;

            /* Global */
            --chat--spacing:             1rem;
            --chat--border-radius:       0.75rem;
            --chat--transition-duration: 200ms;
            --chat--font-family:         'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

            /* Window */
            --chat--window--width:         400px;
            --chat--window--height:        600px;
            --chat--window--border:        1px solid #EDD9C0;
            --chat--window--border-radius: 0.75rem;

            /* Header */
            --chat--header--background:    #1C0F07;
            --chat--header--color:         #F8F1E6;
            --chat--header--border-bottom: 1px solid rgba(255,255,255,0.08);
            --chat--heading--font-size:    1.125rem;

            /* Body & footer */
            --chat--body--background:      #F8F1E6;
            --chat--footer--background:    #F8F1E6;
            --chat--footer--color:         #1C0F07;
            --chat--footer--border-top:    1px solid #EDD9C0;

            /* Messages */
            --chat--message--font-size:        0.9375rem;
            --chat--message--border-radius:    0.75rem;
            --chat--message--bot--background:  #FFFFFF;
            --chat--message--bot--color:       #1C0F07;
            --chat--message--bot--border:      1px solid #EDD9C0;
            --chat--message--user--background: #C96235;
            --chat--message--user--color:      #FFFFFF;
            --chat--message--user--border:     none;
            --chat--message--pre--background:  rgba(28,15,7,0.05);

            /* Toggle button */
            --chat--toggle--background:        #C96235;
            --chat--toggle--hover--background: #B55228;
            --chat--toggle--active--background:#8A3A1E;
            --chat--toggle--color:             #FFFFFF;
            --chat--toggle--size:              56px;

            /* Input area */
            --chat--input--background:    #FFFFFF;
            --chat--input--text-color:    #1C0F07;
            --chat--input--border:        0;
            --chat--input--border-active: 0;
            --chat--textarea--height:     48px;

            /* Buttons */
            --chat--button--background--primary:       #C96235;
            --chat--button--background--primary--hover:#B55228;
            --chat--button--color--primary:            #FFFFFF;
            --chat--button--border-radius:             9999px;
          }
        `}} />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
        {children}
        <N8nChat />
      </body>
    </html>
  );
}
