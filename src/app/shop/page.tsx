"use client"
import FeaturedCarousel from "@/app/layout/FeaturedCarousel";
import ProductCard from "../components/ProductCard";
import React, {useEffect, useState} from "react";
import {Product} from "@/app/types/product";
import {getProduct} from "@/app/api/product";
import {AxiosError} from "axios";
import {PARAMS} from "@/app/admin/product/list/page";
import {useError} from "@/app/components/ErrorProvider";
import {Pagination} from "@mui/material";

export type PARAMS = {
  page: number;
  rowsPerPage: number;
};

export default function Shop() {
  const {showError} = useError();
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [totalItems, setTotalPage] = useState<number>(0)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: PARAMS = {page, rowsPerPage};
        const response = await getProduct(params);
        setProducts(response.data.list)
        setTotalPage(response.data.pagination.totalItems)
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message)
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto p-2">
      <FeaturedCarousel/>
      <div
        className="relative flex items-center justify-center text-gray-400 font-semibold rounded-xl p-4 tracking-wide text-lg uppercase">
        <span className="relative px-4 bg-white rounded-xl z-1 text-3xl">Sản phẩm bán chạy</span>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
      <Pagination
        count={Math.ceil(totalItems / rowsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          "& .MuiPaginationItem-root": {
            color: "#fff",
            backgroundColor: "#1976d2",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            "&.Mui-selected": {
              backgroundColor: "#004ba0",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
}
