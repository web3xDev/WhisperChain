import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HStack } from "@chakra-ui/react";

export const useTip = (contractAddress, contractAbi) => {
  const customToastStyle = {
    borderRadius: "16px",
    backgroundColor: "#282828",
    color: "white ",
    width: "75%",
    marginLeft: "90px",
  };

  const CustomToastContent = () => (
    <HStack spacing={3}>
      <BsFillCheckCircleFill style={{ color: "#9171f8" }} />
      <span>Tip Successfully Sent!</span>
    </HStack>
  );

  const notify = () =>
    toast(<CustomToastContent />, {
      style: customToastStyle,
    });

  const { write, data, error } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "tipConfession",

    onSuccess(data) {
      notify();
      console.log(data);
    },
  });

  const tipConfession = async (confessionId, tipAmount) => {
    if (
      typeof confessionId === "undefined" ||
      typeof tipAmount === "undefined"
    ) {
      console.error("Both confessionId and tipAmount must be provided");
      return;
    }

    const options = {
      args: [confessionId],
      value: parseEther(tipAmount),
    };

    try {
      const result = write(options);
      return result;
    } catch (err) {
      console.error("Error in tipConfession:", err);
      throw err;
    }
  };

  return { tipConfession, transaction: data, error };
};
