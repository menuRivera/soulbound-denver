'use client'

import { ConnectWallet } from "@/components/ConnectWallet";
import { MintForm } from "@/components/MintForm";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <main className="container">
      {/* Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center mb-8 py-4" style={{ zIndex: 10 }}>
        <h1 className="logo-text">
          MONAD<span className="logo-highlight">DENVER</span>
        </h1>
        <ConnectWallet />
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full gap-4" style={{ zIndex: 10 }}>
        <Stats />
        <MintForm />
      </div>
    </main>
  );
}
