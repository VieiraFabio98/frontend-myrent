"use client"

import Houses from "./components/houses";
import Renters from "./components/renters";

interface PageProps {
  activeTab: string;
}

export default function Page({ activeTab }: PageProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "renters":
        return <Renters />
      case "houses":
        return <Houses />
      case "contracts":
        return <div>Contratos</div>
      case "reports":
        return <div>Relatórios</div>
      case "profile":
        return <div>Perfil</div>
      default:
        return <div>Bem-vindo!</div>
    }
  };

  return <>{renderContent()}</>;
}
