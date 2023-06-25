import React, { useEffect, useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../service/category.service";

const useCategory = () => {
  // IMPORTING REACT-HOOK-FORM FOR FORM VALIDATION , STATEMANAGEMENT AND SUBMITION
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    mode: "all",
    shouldUnregister: false,
  });
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [editState, setEditState] = useState<any>({});

  // THESE ARE CHARA UI CUSTOM HOOK TO HANDLE MODALS
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const { onOpen, isOpen, onClose } = useDisclosure();

  //THIS USEEFFECT IS USE WHEN WE CLICK ON UPDATE BUTTON TO FILL ALL FIELDS OF FORM

  useEffect(() => {
    if (editState) {
      setValue("name", editState?.name);
    }
  }, [editState]);

  useEffect(() => {
    fetchData();
  }, [page]);

  //THIS IS FETCH FUNCTION TO GET LIST
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getCategory(page, rows);
      setCategoryList(data?.data);
      setTotalCount(data?.totalCount);
      setLoading(false);
    } catch (error: any) {
      console.log("error", error);

      setLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };

  // THIS FUNCTION IS USE WHEN WE CLICK ON NEXT PAGE OF PAGINATED TABLE
  const handlePageChange = (event: any) => {
    const page = event.selected;
    setPage(page);
  };

  // THIS FUNCTION TRIGGERED WHEN MODAL IS CLOSES
  const onModalClose = () => {
    reset();
    onClose();
    setUpdateModal(false);
  };

  // WHEN EDIT BUTTON IS HIT THIS FUNCTION IS TRIGGERED
  const modalShowHandler = (row: any) => {
    setEditState(row);
    setUpdateModal(true);
  };

  // THIS FUNCTION IS TRIGGERED WHEN CLICK ON DELETE HANDLER
  const deleteHandler = async (id: string) => {
    try {
      setLoadingDelete(true);
      const { data } = await deleteCategory(id);
      setLoadingDelete(false);
      fetchData();
      onCloseAlert();
      toast({
        title: "Deleted successfully",
        status: "success",
        variant: "top-accent",
        isClosable: true,
      });
    } catch (error: any) {
      console.log("error", error);
      setLoadingDelete(false);
      onCloseAlert();
      toast({
        title: "Something went wrong",
        description: `${error?.response?.data?.message}`,

        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };

  // THIS FUNCTION IS TRIGGERED WHEN CREATING NEW CAR
  const onAdd = async (value: any) => {
    try {
      setLoadingAdd(true);
      await createCategory(value);
      setLoadingAdd(false);
      fetchData();
      onModalClose();
    } catch (error: any) {
      console.log("error", error);
      setLoadingAdd(false);
      toast({
        title: "Something went wrong",
        description: `${error?.response?.data?.message}`,
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };

  // THIS FUNCTION IS TRIGGERED WHEN UPDATING A CAR
  const onUpdate = async (value: any) => {
    try {
      setLoadingUpdate(true);
      await updateCategory(value, editState?.id);
      setLoadingUpdate(false);
      fetchData();
      onModalClose();
    } catch (error: any) {
      console.log("error", error);
      setLoadingUpdate(false);
      toast({
        title: "Something went wrong",
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };
  return {
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
  };
};

export default useCategory;
