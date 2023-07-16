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
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { loginApi } from "../service/auth.service";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../components/auth/authContex";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setAuthData } = useContext(AuthContext);

  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // THIS FUNCTION IS USED TO HIT API CALL FOR SIGNIN PURPOSE
  const onSubmit = async (value: any) => {
    try {
      setLoading(true);
      const { data } = await loginApi(value);
      setAuthData({ accessToken: data?.access_token, user: data?.data });
      setLoading(false);
      toast({
        title: `Logged in successfully`,
        status: "success",
        variant: "top-accent",
        isClosable: true,
      });
    } catch (error: any) {
      console.log("error", error);

      setLoading(false);
      toast({
        title: "Error Loggin in",
        description: `${error?.response?.data?.error}`,
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
            Sign in to your account
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
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />{" "}
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={Boolean(errors?.password)}
                isRequired
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Text
                color={"blue.400"}
                textAlign={"right"}
                w="full"
                cursor={"pointer"}
                onClick={() => navigate("/signup")}
              >
                Create an account
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
