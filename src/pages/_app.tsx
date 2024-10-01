import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${open_sans.style.fontFamily};
        }
      `}</style>
      {getLayout(
        <>
          <Component {...pageProps} /> <Toaster />
        </>
      )}
    </>
  );
}
