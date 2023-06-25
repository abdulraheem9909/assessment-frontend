import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { GenericModal } from "../common/modal";

const CarModal = ({
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
  categoryList,
}: any) => {
  const toast = useToast();
  const handleEmptyCategoryList = () => {
    toast({
      title: "Category List is empty",
      description: "Go to Category tab to add categories",
      status: "info",
      variant: "top-accent",
      isClosable: true,
    });
  };
  const renderDropdownOption = (role: string) => {
    return <option value={role}>{role}</option>;
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onModalClose}
      title={updateModal ? "Update Car" : "Add Car"}
      onClickHandler={
        categoryList?.length
          ? handleSubmit(updateModal ? onUpdate : onAdd)
          : handleEmptyCategoryList
      }
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
        <FormControl isInvalid={Boolean(errors?.model)} isRequired>
          <FormLabel htmlFor="model">Model</FormLabel>
          <Input
            type="text"
            placeholder="Enter  model..."
            {...register("model", {
              required: "Model is required",
            })}
          />
          <FormErrorMessage>{errors?.model?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.make)} isRequired>
          <FormLabel htmlFor="make">Make</FormLabel>
          <Input
            type="text"
            placeholder="Enter  make..."
            {...register("make", {
              required: "Make is required",
            })}
          />
          <FormErrorMessage>{errors?.make?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack mt="4">
        <FormControl isInvalid={Boolean(errors?.category)} isRequired>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select
            placeholder="Please select category"
            {...register("category", {
              required: "Category is required",
            })}
            color={"gray.500"}
          >
            {categoryList?.map((role: any) => {
              return renderDropdownOption(role);
            })}
          </Select>
          <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors?.color)} isRequired>
          <FormLabel htmlFor="color">Color</FormLabel>
          <Input
            type="text"
            placeholder="Enter  color..."
            {...register("color", {
              required: "Color is required",
            })}
          />
          <FormErrorMessage>{errors?.color?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack mt="4">
        <FormControl isInvalid={Boolean(errors?.registrationNo)} isRequired>
          <FormLabel htmlFor="Registration No">Registration No</FormLabel>
          <Input
            type="text"
            placeholder="Enter Registration Number..."
            {...register("registrationNo", {
              required: "Registration Number is required",
            })}
          />
          <FormErrorMessage>{errors?.registrationNo?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
    </GenericModal>
  );
};

export default CarModal;
