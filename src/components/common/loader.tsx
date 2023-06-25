import { Spinner, Box, Flex } from '@chakra-ui/react';

function LoaderScreen() {
  return (
    <Flex
      height="80vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Spinner size="xl" />
      </Box>
    </Flex>
  );
}

export default LoaderScreen;
