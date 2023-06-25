import React from "react";
import { Stack, Text, Button, Badge } from "@chakra-ui/react";
import useDashboard from "./useDashboard";
import LoaderScreen from "../common/loader";

export default function Dashboard() {
  const { loading, count, navigate } = useDashboard();

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <Stack
          p="4"
          py="6"
          boxShadow="lg"
          my="4"
          borderRadius="lg"
          bg="white"
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "inherit", md: "center" }}
          justify={"space-between"}
        >
          <Stack direction="row" alignItems="center">
            <Text fontWeight="semibold" fontSize={{ base: "md", md: "xl" }}>
              Number of registered cars :
            </Text>
            <Badge
              fontSize={{ base: "md", md: "xl" }}
              px="4"
              colorScheme="blue"
            >
              {count}
            </Badge>
          </Stack>

          <Stack justifyContent="space-between">
            <Stack direction={{ base: "column", md: "row" }}>
              <Button colorScheme="blue" onClick={() => navigate("/car")}>
                Show Cars
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}
