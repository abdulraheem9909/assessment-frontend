import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";

export function DeleteAlert({
  onClickHandler,
  isOpen,
  onClose,
  selectedId,
  loadingDelete,
}: any) {
  const cancelRef: any = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

       
        <AlertDialogContent  borderRadius={"11px 11px 11px 11px"} >
          <AlertDialogHeader
            borderRadius={"10px 10px 0px 0px"}
            bg="#3182CE"
            color="white"
          >
            Delete Alert !
          </AlertDialogHeader>
          <AlertDialogCloseButton color="white" />
          <AlertDialogBody>
            <Text>This will permanently delete the item.</Text>
            <Text> This action is irreversible. Proceed?</Text>
          </AlertDialogBody>
          <AlertDialogFooter  borderRadius={"0px 0px 10px 10px"}>
            <Button
              ref={cancelRef}
              onClick={() => {
                onClose();
              }}
              isDisabled={loadingDelete}
            >
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                onClickHandler(selectedId);
              }}
              isDisabled={loadingDelete}
              isLoading={loadingDelete}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
