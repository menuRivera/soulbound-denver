'use client'

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'

export function ConnectWallet() {
    const { address, isConnected, chainId } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()
    const { switchChain } = useSwitchChain()

    // 10143 is Monad Testnet
    const isWrongNetwork = isConnected && chainId !== 10143

    if (isConnected) {
        if (isWrongNetwork) {
            return (
                <button
                    className="btn-primary bg-red-500 hover:bg-red-600"
                    onClick={() => switchChain({ chainId: 10143 })}
                >
                    Switch to Monad
                </button>
            )
        }

        return (
            <button className="btn-secondary" onClick={() => disconnect()}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
        )
    }

    return (
        <div className="flex gap-2">
            {connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                    Connect {connector.name}
                </button>
            ))}
        </div>
    )
}
