import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  useToast,
  Text,
} from "@chakra-ui/react";
import { loginApi, signUpApi } from "../service/auth.service";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/authContex";
import { useNavigate } from "react-router-dom";

export default function SignPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthData } = useContext(AuthContext);

  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
    },
  });
  // THIS FUNCTION IS USED TO HIT API CALL FOR SIGNUP PURPOSE
  const onSubmit = async (value: any) => {
    try {
      setLoading(true);
      const { data } = await signUpApi(value);
      navigate("/login");
      setLoading(false);
      toast({
        title: `Signup successfully`,
        description: `Please Check email on ${data?.email}`,
        status: "success",
        variant: "top-accent",
        isClosable: true,
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error Loggin in",
        description: `${error?.response?.data?.message}`,
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        minW={{ base: "auto", md: "600px" }}
      >
        <Stack align={"center"}>
          <Heading fontSize={{ base: "xl", md: "4xl" }}>
            Create an account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <FormControl
                id="email"
                isInvalid={Boolean(errors?.email)}
                isRequired
              >
                <FormLabel>Enter email</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />{" "}
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="name"
                isInvalid={Boolean(errors?.name)}
                isRequired
              >
                <FormLabel>Enter Full Name</FormLabel>
                <Input
                  type="text"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <Text
                color={"blue.400"}
                textAlign={"right"}
                w="full"
                cursor={"pointer"}
                onClick={() => navigate("/login")}
              >
                Already have a account
              </Text>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={loading}
                  isDisabled={loading}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
