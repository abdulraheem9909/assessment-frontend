import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { carCount } from "../../service/cars.service";

// PURPOSE OF THIS FILE IS TO SEPRATE LOGIC WITH JSX

const useDashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(null);
  // TO FETCH TOTAL COUNT OF REGISTERED CARS IN SYSTEM
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await carCount();
        setCount(data);

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
    fetchData();
  }, []);

  return { loading, count, navigate };
};

export default useDashboard;
