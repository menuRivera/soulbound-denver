'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected) {
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
