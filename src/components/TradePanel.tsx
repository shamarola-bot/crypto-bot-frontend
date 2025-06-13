import { Button, VStack, Text, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Signal } from "../types";

interface TradePanelProps {
  publicKey: string | null;
}

export const TradePanel = ({ publicKey }: TradePanelProps) => {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [amount, setAmount] = useState<string>("0.1");
  const [tokenMint] = useState<string>("So11111111111111111111111111111111111111112");

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/signal/solana`
        );
        setSignal(response.data);
      } catch (error) {
        console.error("Failed to fetch signal:", error);
      }
    };
    fetchSignal();
    const interval = setInterval(fetchSignal, 60000);
    return () => clearInterval(interval);
  }, []);

  const executeTrade = async () => {
    if (!publicKey) {
      alert("Please connect wallet");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/swap`,
        { publicKey, tokenMint, amount: parseFloat(amount) }
      );
      alert(`Trade executed: ${response.data.message}`);
    } catch (error) {
      console.error("Trade failed:", error);
      alert("Trade failed");
    }
  };

  return (
    <VStack spacing={4}>
      <Text>Token: SOL</Text>
      {signal && (
        <>
          <Text>Current Price: ${signal.price.toFixed(2)}</Text>
          <Text>7-Day MA: ${signal.movingAverage.toFixed(2)}</Text>
          <Text>Signal: {signal.signal.toUpperCase()}</Text>
        </>
      )}
      <Input
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        colorScheme="teal"
        onClick={executeTrade}
        isDisabled={signal?.signal !== "buy" || !publicKey}
      >
        Execute Trade
      </Button>
    </VStack>
  );
};