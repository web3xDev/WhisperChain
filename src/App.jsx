import { Flex, VStack } from "@chakra-ui/react";
import Abi from "./contracts/Abi.json";
import GetConfessions from "./GetConfessions";
import PostConfession from "./PostConfession";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const contractAbi = Abi;

  //console.log(contractAbi);

  return (
    <Flex h="100vh" direction="column" bg="#121212" className="App">
      <Navbar />

      <VStack h="90%" justify="center" spacing={3}>
        <GetConfessions
          contractAbi={contractAbi}
          contractAddress={contractAddress}
        />
        <PostConfession
          contractAbi={contractAbi}
          contractAddress={contractAddress}
        />
        <Footer />
      </VStack>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
      />
    </Flex>
  );
}
