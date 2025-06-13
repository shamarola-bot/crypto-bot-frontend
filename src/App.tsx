import { ChakraProvider, Box, Heading, VStack } from "@chakra-ui/react";
import { WalletConnect } from "./components/WalletConnect";
import { TradePanel } from "./components/TradePanel";
import { TransactionHistory } from "./components/TransactionHistory";
import { useState } from "react";

function App() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const handleConnect = (pubKey: string, balance: number) => {
    setPublicKey(pubKey);
    setBalance(balance);
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="600px" mx="auto">
        <Heading mb={8}>AI Crypto Trading Bot</Heading>
        <VStack spacing={8}>
          <WalletConnect onConnect={handleConnect} />
          <TradePanel publicKey={publicKey} />
          <TransactionHistory />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;