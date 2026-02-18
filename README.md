# Monad Denver 2026 Soulbound Minter

A modern, glassmorphic dApp for minting Soulbound Tokens (SBTs) on the Monad Testnet. This project features fully on-chain metadata storage and a premium, responsive design.

## Features

- **Soulbound Minting**: Mint a non-transferable NFT that represents your identity.
- **On-Chain Metadata**: Metadata and images (base64 encoded) are stored 100% on-chain.
- **Modern UI**: Built with a custom glassmorphism design system, animated gradients, and the Outfit font.
- **Network Awareness**: Automatically prompts users to switch to Monad Testnet if connected to the wrong chain.
- **Responsive**: Optimized for both desktop and mobile.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Web3**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
- **Styling**: Pure CSS (Custom Design System) & CSS Variables
- **Chain**: Monad Testnet

## Getting Started

### Prerequisites

- Node.js (v18+)
- A web3 wallet (e.g., MetaMask, Rabby) configured for Monad Testnet.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd soulbound-denver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

The contract address is configured in `src/config/contract.ts`:

```typescript
export const CONTRACT_ADDRESS = '0x767dad5E959F206Fb6671CC3419497c1f0bb8329'
```

The chain configuration is located in `src/config/wagmi.ts`.

## Development

- **Linting**: `npm run lint`
- **Building**: `npm run build`

## License

MIT
