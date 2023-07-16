import { Button, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import CustomTable from "../common/customTable/customTable";
import useCategory from "./useCategory";
import { DeleteAlert } from "../common/deleteAlert";
import CategoryModal from "./categoryModal";

const Category = () => {
    // THIS HOOK HAVE LOGICAL DATA
  const {
    loading,
    categoryList,
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
    modalShowHandler,
    deleteHandler,
    onAdd,
    onUpdate,
    loadingAdd,
    loadingDelete,
    loadingUpdate,
  } = useCategory();
  const columns = [
    { Header: "Name", accessor: "name" },

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
      <HStack
        p="4"
        py="6"
        boxShadow="lg"
        my="4"
        borderRadius="lg"
        bg="white"
        justify={"space-between"}
      >
        <Heading fontSize={{ base: "xl", md: "2xl" }}>Categories List</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Category
        </Button>
      </HStack>
      <CustomTable
        columns={columns}
        data={categoryList}
        loading={loading}
        count={totalCount ? Math.ceil(totalCount / rows) : 0}
        handlePageChange={handlePageChange}
        name="category"
      />
      <DeleteAlert
        onClickHandler={deleteHandler}
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        onOpen={onOpenAlert}
        selectedId={selectedId}
        loadingDelete={loadingDelete}
      />
      <CategoryModal
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
      />
    </>
  );
};

export default Category;
