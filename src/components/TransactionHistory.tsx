import { VStack, Text } from "@chakra-ui/react";

export const TransactionHistory = () => {
  return (
    <VStack spacing={4}>
      <Text fontSize="xl">Transaction History</Text>
      <Text>No transactions yet (placeholder)</Text>
    </VStack>
  );
};