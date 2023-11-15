import { useState } from "react";
import { VStack, Text, Input, Button, HStack } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function PostConfession({ contractAddress, contractAbi }) {
  const { isConnecting, isDisconnected } = useAccount();

  const [confession, setConfession] = useState("");

  const customToastStyle = {
    borderRadius: "16px",
    backgroundColor: "#282828",
    color: "white ",
    width: "60%",
    marginLeft: "120px",
  };

  const CustomToastContent = () => (
    <HStack spacing={3}>
      <BsFillCheckCircleFill style={{ color: "#9171f8" }} />
      <span>Post submitted!</span>
    </HStack>
  );

  const notify = () =>
    toast(<CustomToastContent />, {
      style: customToastStyle,
    });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "postConfession",
    args: [confession],
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess(data) {
      notify();
      console.log(data);
    },
  });

  return (
    <VStack
      bg="#282828"
      h={["20%", "22%", "22%", "22%", "22%"]}
      w={["80%", "75%", "70%", "60%"]}
      spacing={3}
      align="center"
      justify="center"
      rounded="2xl"
      border="1px"
      borderColor="#3D3D3D"
      boxShadow="lg"
    >
      <Text color="#EEEEEE">Let's post your confession...</Text>

      <Input
        w="70%"
        border="1px"
        borderColor="#525252"
        value={confession}
        rounded="xl"
        color="#EEEEEE"
        onChange={(e) => setConfession(e.target.value)}
        transition="all 0.2s ease-in-out"
        _hover={{}}
        _focus={{ borderColor: "#9171f8", boxShadow: "none" }}
        isDisabled={isDisconnected}
      ></Input>
      <Button
        isDisabled={isConnecting || isDisconnected || confession == ""}
        onClick={() => write?.()}
        bg="#5e43f3"
        color="#fff"
        rounded="3xl"
        transition="all 0.2s ease-in-out"
        _hover={{ opacity: !confession ? 0.4 : 0.8 }}
        _focus={{
          bg: "#5e43f3",
          boxShadow: "none",
        }}
      >
        Post
      </Button>
    </VStack>
  );
}
