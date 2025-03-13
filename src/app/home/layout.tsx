"use client"

import { useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import React from "react";
import Page from "./page";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeTab, setActiveTab] = useState("")
  
  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <Page activeTab={activeTab} /> {/* Renderiza Page com activeTab */}
      </main>
      <Footer />
    </div>
  )
}