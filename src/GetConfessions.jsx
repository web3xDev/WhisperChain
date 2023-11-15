import { useContractRead, useAccount } from "wagmi";
import {
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { TfiAnnouncement } from "react-icons/tfi";
import { formatEther } from "viem";
import { useTip } from "./hooks/useTip";

export default function GetConfessions({ contractAbi, contractAddress }) {
  const { isConnected } = useAccount();

  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getAllConfessions",
    watch: true,
  });

  const { tipConfession } = useTip(contractAddress, contractAbi);

  const handleTip = async (confessionsId, tipAmount) => {
    await tipConfession(confessionsId, tipAmount);
  };

  const renderConfessions = (confessions) => {
    const reversedConfessions = [...confessions].reverse();

    return (
      <List spacing={3}>
        {reversedConfessions.map((confession, index) => (
          <ListItem key={index} borderRadius="lg" p={2} shadow="sm">
            <VStack spacing={2} align="start">
              <HStack spacing={0}>
                <ListIcon as={TfiAnnouncement} color="#9171f8" />
                <Text as="span" fontWeight="bold" color="#EEEEEE">
                  Confession #{confessions.length - index}:
                </Text>
              </HStack>

              <Text>{confession.content}</Text>
            </VStack>

            <HStack>
              <Text fontSize="sm" color="#777777" mt={1}>
                Tip Amount: {formatEther(confession.tipAmount)} ETH
              </Text>
              <Button
                size="xs"
                bg="none"
                border="1px"
                borderColor="#777777"
                color="#777777"
                rounded="2xl"
                transition="all 0.2s ease-in-out"
                _hover={{
                  color: "#9171f8",
                  borderColor: "#9171f8",
                }}
                _focus={{
                  opacity: "0.8",
                  boxShadow: "none",
                }}
                onClick={() => handleTip(confession.id, "0.01")}
              >
                Tip
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <VStack
      bg="#282828"
      w={["80%", "75%", "70%", "60%"]}
      h={["55%", "67%", "65%", "65%", "65%"]}
      spacing={3}
      p={6}
      rounded="2xl"
      border="1px"
      borderColor="#3D3D3D"
      boxShadow="lg"
    >
      <Text fontSize="2xl" fontWeight="black" color="#EEEEEE">
        Confessions
      </Text>
      <VStack overflow="scroll" scrollBehavior="smooth">
        {isLoading && <Spinner />}
        {isError && (
          <Alert status="error" rounded="xl">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>
              Please connect your wallet first!
            </AlertDescription>
          </Alert>
        )}
        {isSuccess && isConnected && (
          <VStack spacing={4} color="#EEEEEE">
            {renderConfessions(data)}
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
