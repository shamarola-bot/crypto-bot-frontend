import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

interface WalletConnectProps {
  onConnect: (publicKey: string, balance: number) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        await window.solana.connect();
        const pubKey = window.solana.publicKey.toString();
        setPublicKey(pubKey);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/balance/${pubKey}`
        );
        setBalance(response.data.balance);
        onConnect(pubKey, response.data.balance);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      alert("Phantom wallet not detected");
    }
  };

  return (
    <VStack spacing={4}>
      {publicKey ? (
        <>
          <Text>Connected: {publicKey.slice(0, 8)}...</Text>
          <Text>Balance: {balance} SOL</Text>
        </>
      ) : (
        <Button colorScheme="teal" onClick={connectWallet}>
          Connect Phantom Wallet
        </Button>
      )}
    </VStack>
  );
};