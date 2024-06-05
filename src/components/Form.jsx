import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Container from "./Container";

const Form = () => {
  const [value, setValue] = useState({
    name: "cat",
  });
  const queryClient = useQueryClient();
  const [img, setImg] = useState([]);
  const clientId = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

  const handleChange = (e) => {
    setValue({
      name: e.target.value,
    });
  };

  const fetchImg = async (val) => {
    const test = `https://api.unsplash.com/search/photos?query=${val}&client_id=${clientId}&per_page=10`;
    console.log(test);
    const result = await axios.get(test);
    return result.data;
  };

  const {
    mutate:searchImg,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchImg,
    onSuccess: (data) => {
        setImg(data.results)
    },
  });
  useEffect(()=>{
    searchImg(value.name)
  },[])
  if (isError) {
    console.log(error);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    searchImg(value.name);
  };

  return (
    <div>
      <div className="flex justify-center mt-12 items-center">
        <form onSubmit={onSubmit} className="flex  items-center gap-4">
            <div className="font-semibold tracking-wider text-xl">
          Search :{" "}
            </div>
          <input
          className="w-96 border-2  border-gray-300 h-10 pl-3"
            type="text"
            name="value"
            id="value"
            onChange={handleChange}
            value={value.name}
          />
          <input
            type="submit"
            id="submit"
            value="SUBMIT"
            className="pl-8 cursor-pointer bg-green-300 pr-8  pt-2 pb-2"
          />
        </form>
      </div>
      <div>
        <Container img={img} />
      </div>
    </div>
  );
};

export default Form;
