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
    <div className="h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="bg-primary flex-1 min-h-0">
        <Page activeTab={activeTab} /> {/* Renderiza Page com activeTab */}
      </main>
      <Footer />
    </div>
  )
}