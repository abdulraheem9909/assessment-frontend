import React, { ReactNode, useContext } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown, FiLogOut, FiHome } from "react-icons/fi";
import { AiFillCar, AiFillSetting } from "react-icons/ai";

import { IconType } from "react-icons";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useLogout from "../utils/useLogout";
import { AuthContext } from "./auth/authContex";

interface LinkItemProps {
  id: string;
  name: string;
  icon: IconType;
  link: string;
}

const DropDownItems: Array<LinkItemProps> = [
  { id: "logout", name: "Logout", icon: FiLogOut, link: "/" },
];
const MenuItems: Array<LinkItemProps> = [
  {
    id: "home",
    name: "Dashboard",
    icon: FiHome,
    link: "/home",
  },
  {
    id: "cars",
    name: "Cars",
    icon: AiFillCar,
    link: "/car",
  },
  {
    id: "category",
    name: "Category",
    icon: AiFillSetting,
    link: "/category",
  },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      bgRepeat="no-repeat"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 80 }}
        p="6"
        h={`calc(100vh - 80px)`}
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={"black"}
      borderRight="0px"
      borderRightColor={"none"}
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="full"
      boxShadow="none"
      zIndex={11}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        px="8"
        justifyContent="space-between"
        bg="white"
      >
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Car Management
        </Text>{" "}
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex pt="8" direction="column">
        {MenuItems.map((link: any) => {
          return (
            <NavItem key={link?.name} icon={link?.icon} link={link?.link}>
              {link?.name}
            </NavItem>
          );
        })}
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();

  return (
    <Link to={link}>
      <Flex
        align="center"
        p="4"
        mx="2"
        my="2"
        fontSize={"md"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "white",
          color: "black",
        }}
        color="white"
        style={{
          background: pathname.includes(`${link}`) ? "white" : "",
          color: pathname.includes(`${link}`) ? "black" : "",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="14"
            color={pathname.includes(link) ? "black" : "gray.400"}
            _groupHover={{
              color: "black",
            }}
            boxSize="5"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { authData } = useContext(AuthContext);

  const navigate = useNavigate();
  const { logoutHandler } = useLogout();
  const { pathname } = useParams();

  return (
    <Flex
      ml={{ base: 0, md: 80 }}
      px={{ base: 4, md: 4 }}
      height="80px"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      boxShadow="xl"
      position={"sticky"}
      top="0"
      zIndex={"10"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Link to="/">
        <Text
          fontWeight={"bold"}
          fontSize={"xl"}
          display={{ base: "block", md: "none" }}
        >
          Car Management
        </Text>{" "}
      </Link>

      <HStack spacing={{ base: "2", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  name={authData?.user?.name}
                  bg={"gray.300"}
                  color={"gray.900"}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{authData?.user?.name}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={"white"}
              borderColor={"white"}
              position="relative"
              zIndex={2}
              borderRadius="none"
            >
              {DropDownItems.map((link) => {
                return (
                  <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    mt="2"
                    key={link?.id}
                    _hover={{
                      bg: "black",
                      color: "white !important",
                    }}
                    style={{
                      background: pathname === `${link.link}` ? "black" : "",
                      color: pathname?.includes(`${link}`) ? "white" : "",

                      fontSize: "18px",
                    }}
                    {...rest}
                    onClick={() => {
                      if (link.name === "Logout") {
                        logoutHandler();
                      } else {
                        navigate("/profile");
                      }
                    }}
                  >
                    {link.icon && (
                      <Icon
                        mr="4"
                        fontSize="20"
                        _groupHover={{
                          color: "white",
                        }}
                        as={link.icon}
                      />
                    )}
                    {link.name}
                  </Flex>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
