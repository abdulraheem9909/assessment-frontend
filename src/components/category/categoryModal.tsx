import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { GenericModal } from "../common/modal";

const CategoryModal = ({
  isOpen,
  onModalClose,
  updateModal,
  handleSubmit,
  errors,
  register,
  loadingAdd,
  loadingUpdate,
  onAdd,
  onUpdate,
}: any) => {
  
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onModalClose}
      title={updateModal ? "Update Category" : "Add Category"}
      onClickHandler={handleSubmit(updateModal ? onUpdate : onAdd)}
      buttonText={
        loadingAdd || loadingUpdate
          ? "Loading"
          : updateModal
          ? "Update"
          : "Save"
      }
      loadingButton={loadingAdd || loadingUpdate}
    >
      <HStack mt="4">
        <FormControl isInvalid={Boolean(errors?.name)} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter name ..."
            {...register("name")}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
    </GenericModal>
  );
};

export default CategoryModal;
