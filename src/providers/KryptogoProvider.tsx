import { connectorsForWallets, kryptogoConnector } from "@kryptogo/kryptogokit-sdk-react";
import "@kryptogo/kryptogokit-sdk-react/styles.css";
import {
    coinbaseWallet,
    injectedWallet,
    kryptogoWallet,
    okxWallet,
    walletConnectWallet,
} from "@kryptogo/kryptogokit-sdk-react/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from 'viem';
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrum, bsc, mainnet, polygon } from "wagmi/chains";


const queryClient = new QueryClient();

const connectors = connectorsForWallets(
    [
        {
            groupName: "Recommended",
            wallets: [walletConnectWallet, coinbaseWallet, kryptogoWallet],
        },
        {
            groupName: "More",
            wallets: [okxWallet, injectedWallet],
        },
    ],
    {
        appName: "TechStore Invoice",
    }
);

const KryptogoConnector = kryptogoConnector();

const config = createConfig({
    connectors: [...connectors, KryptogoConnector],
    chains: [mainnet, arbitrum, polygon, bsc],
    client({ chain }) {
        return createClient({ chain, transport: http() });
    },
});

interface KryptogoProviderProps {
    children: React.ReactNode;
}

export const KryptogoProvider = ({ children }: KryptogoProviderProps) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}; 