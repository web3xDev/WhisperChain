import { Flex, HStack, Text, Image, Button, Link } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { FaFaucet } from "react-icons/fa6";

export default function Navbar() {
  const { isConnected } = useAccount();

  return (
    <Flex
      direction={["column", "column", "row", "row"]}
      p={3}
      h="10%"
      justify="space-between"
      align="center"
      w="100%"
      mb={[0, 12, 0, 0, 0]}
    >
      <HStack spacing={0} ml="-10px">
        <Image src="./logo.png" boxSize={20}></Image>
        <Text color="#fff" fontWeight="bold" ml="-2">
          WhisperChain
        </Text>
      </HStack>
      <HStack>
        {isConnected ? (
          <Link href="https://testnet.bnbchain.org/faucet-smart" isExternal>
            <Button
              rounded="3xl"
              bg="#171717"
              border="1px"
              borderColor="#232323"
              color="#e4e7e7"
              _hover={{ bg: "#1e1e1e" }}
            >
              <FaFaucet />
            </Button>
          </Link>
        ) : null}

        <w3m-button />
      </HStack>
    </Flex>
  );
}
