import React, { useEffect, useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  createCar,
  deleteCar,
  getCars,
  updateCar,
} from "../../service/cars.service";
import { useForm } from "react-hook-form";
import { getCategoryAll } from "../../service/category.service";

const useCar = () => {
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
  const [carsList, setCarsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [editState, setEditState] = useState<any>({});

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (editState) {
      setValue("make", editState?.make);
      setValue("model", editState?.model);
      setValue("color", editState?.color);
      setValue("category", editState?.category);
      setValue("registrationNo", editState?.registrationNo);
    }
  }, [editState]);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [page]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getCars(page, rows);
      setCarsList(data?.data);
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
  const fetchCategory = async () => {
    try {
      const { data } = await getCategoryAll();
      const catList = data?.map((item: any) => item?.name);
      setCategoryList(catList);
    } catch (error: any) {
      console.log("error", error);
    }
  };
  const handlePageChange = (event: any) => {
    const page = event.selected;
    setPage(page);
  };
  const onModalClose = () => {
    reset();
    onClose();
    setUpdateModal(false);
  };
  const modalShowHandler = (row: any) => {
    setEditState(row);
    setUpdateModal(true);
  };
  const deleteHandler = async (id: string) => {
    try {
      setLoadingDelete(true);
      const { data } = await deleteCar(id);
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
      onCloseAlert();
      setLoadingDelete(false);
      toast({
        title: "Something went wrong",
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };
  const onAdd = async (value: any) => {
    try {
      setLoadingAdd(true);
      await createCar(value);
      setLoadingAdd(false);
      fetchData();
      onModalClose();
    } catch (error: any) {
      console.log("error", error);
      setLoadingAdd(false);
      toast({
        title: "Something went wrong",
        status: "error",
        variant: "top-accent",
        isClosable: true,
      });
    }
  };
  const onUpdate = async (value: any) => {
    try {
      setLoadingUpdate(true);
      await updateCar(value, editState?.id);
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
    modalShowHandler,
    deleteHandler,
    onAdd,
    onUpdate,
    loadingAdd,
    loadingDelete,
    loadingUpdate,
    categoryList,
  };
};

export default useCar;
