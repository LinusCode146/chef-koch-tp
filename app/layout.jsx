import './globals.css'
import React from "react";
import Header from "../components/Header"
import {Nunito} from "@next/font/google";
import QueryWrapper from "../components/QueryWrapper"
import AuthContext from "../components/AuthContext";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-nunito"
})


export default function RootLayout({
  children,
}) {
    return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head ><title>ChefKoch</title></head>
      <body className={`${nunito.variable}`}>
          <QueryWrapper>
              <AuthContext>
                  <Header />
                  {children}
              </AuthContext>
          </QueryWrapper>
      </body>
    </html>
  )
}
