import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" size="2xl">
        404
      </Heading>
      <Text fontSize="xl" mt={4}>
        Page not found
      </Text>
      <Button colorScheme="blue" mt={4} onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
