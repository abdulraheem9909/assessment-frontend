import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
export const GenericModal = ({
  isOpen,
  onClose,
  children,
  title,
  onClickHandler,
  loadingButton,
  buttonText,
  scroll = true,
  buttonShow=true,
}: any) => {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={"xl"}
        motionPreset="scale"
        scrollBehavior={scroll ? "inside" : "outside"}
        isCentered
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="30%"
          backdropBlur="2px"
        />
        <ModalContent
         borderRadius={"11px 11px 11px 11px"}
          // minW={{ xs:"200px",md: "760px" }}
          minW={[
            "400px", // base
            "470px", // 480px upwards
            "760px", // 768px upwards
            "800px", // 992px upwards
          ]}
          maxW={[
            "400px", // base
            "470px", // 480px upwards
            "760px", // 768px upwards
            "800px", // 992px upwards
          ]}
        >
          <ModalHeader bg="#3182CE" borderRadius={"10px 10px 0px 0px"} color={"white"}>
            {title}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb="4">{children}</ModalBody>
          {buttonShow && (
            <ModalFooter>
              <HStack spacing={"24px"}>
                <Button
                  colorScheme="linkedin"
                  onClick={onClickHandler}
                  isDisabled={loadingButton}
                  isLoading={loadingButton}
                >
                  {buttonText}
                </Button>
                <Button onClick={onClose} isDisabled={loadingButton}>
                  Close
                </Button>
              </HStack>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
