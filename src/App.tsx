import { ChakraProvider, Box, Heading, VStack } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react"; // Correct for v2.8.2
import { WalletConnect } from "./components/WalletConnect";
import { TradePanel } from "./components/TradePanel";
import { TransactionHistory } from "./components/TransactionHistory";
import { useState } from "react";

// Define a minimal theme
const theme = extendTheme({
  components: {}, // Empty components object to satisfy type
});

function App() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  const handleConnect = (pubKey: string, balance: number) => {
    setPublicKey(pubKey);
    setBalance(balance);
  };

  return (
    <ChakraProvider theme={theme}>
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