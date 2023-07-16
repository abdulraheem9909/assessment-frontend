import { Button, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import CustomTable from "../common/customTable/customTable";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import useCar from "./useCar";
import { DeleteAlert } from "../common/deleteAlert";
import CarModal from "./carModal";

const Car = () => {
  // THIS HOOK HAVE LOGICAL DATA
  const {
    loading,
    carsList,
    rows,
    page,
    totalCount,
    handlePageChange,
    isOpenAlert,
    onOpenAlert,
    onCloseAlert,
    selectedId,
    setSelectedId,
    onOpen,
    isOpen,
    onClose,
    handleSubmit,
    register,
    errors,
    onModalClose,
    watch,
    updateModal,
    deleteHandler,
    onAdd,
    onUpdate,
    loadingAdd,
    loadingDelete,
    loadingUpdate,
    modalShowHandler,
    categoryList
  } = useCar();

  const columns = [
    { Header: "Model", accessor: "model" },
    { Header: "Make", accessor: "make" },
    { Header: "Color", accessor: "color" },
    { Header: "Category", accessor: "category" },
    { Header: "Registration No", accessor: "registrationNo" },
    {
      Header: "Edit",
      accessor: "Edit",

      Cell: ({ row }: any) => {
        return (
          <div>
            <BiPencil
              size={15}
              cursor="pointer"
              color="#3182ce"
              onClick={() => {
                modalShowHandler(row.original);
                onOpen();
              }}
            />
          </div>
        );
      },
    },
    {
      Header: "Delete",
      accessor: "Delete",
      Cell: ({ row }: any) => {
        return (
          <div>
            <AiOutlineDelete
              size={15}
              cursor="pointer"
              color="red"
              onClick={() => {
                setSelectedId(row.original._id);
                onOpenAlert();
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      {" "}
      <HStack
        p="4"
        py="6"
        boxShadow="lg"
        my="4"
        borderRadius="lg"
        bg="white"
        justify={"space-between"}
      >
        <Heading fontSize={{ base: "xl", md: "2xl" }}>Cars List</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Car
        </Button>
      </HStack>
      <CustomTable
        columns={columns}
        data={carsList}
        loading={loading}
        count={totalCount ? Math.ceil(totalCount / rows) : 0}
        handlePageChange={handlePageChange}
        name="car"
      />
      <DeleteAlert
        onClickHandler={deleteHandler}
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        onOpen={onOpenAlert}
        selectedId={selectedId}
        loadingDelete={loadingDelete}
      />
      <CarModal
        isOpen={isOpen}
        onModalClose={onModalClose}
        updateModal={updateModal}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        loadingAdd={loadingAdd}
        loadingUpdate={loadingUpdate}
        onAdd={onAdd}
        onUpdate={onUpdate}
        categoryList={categoryList}
      />
    </>
  );
};

export default Car;
