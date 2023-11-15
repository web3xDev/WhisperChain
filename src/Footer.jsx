import { HStack, Text } from "@chakra-ui/react";
import { IoWarningOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <HStack color="#777777" spacing={1}>
      <IoWarningOutline style={{ height: "12px", width: "12px" }} />
      <Text fontSize="xx-small">
        Caution: Decentralized, uncensored user-generated content. Use at your
        own risk.
      </Text>
    </HStack>
  );
};

export default Footer;
