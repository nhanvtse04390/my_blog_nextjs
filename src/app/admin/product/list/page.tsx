"use client"
import React, {useEffect, useState} from "react";
import {getProduct} from "@/app/api/product";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {Product} from "@/app/types/product";
import BaseButton from "@/app/components/BaseButton";
import {useRouter} from "next/navigation";
import BaseTable from "@/app/components/BaseTable";
import {Pagination} from "@mui/material";

export type PARAMS = {
  page: number;
  rowsPerPage: number;
};


const ListProduct: React.FC = () => {
  const {showError} = useError();
  const router = useRouter()
  const [rows, setRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [totalItems, setTotalPage] = useState<number>(0)
  const headerTable = [
    {
      label: 'Tên sản phẩm',
      value: 'name' as keyof Product
    },
    {
      label: 'Giá',
      value: 'price' as keyof Product
    },
    {
      label: 'Mô tả',
      value: 'description' as keyof Product
    },
    {
      label: 'Giảm giá',
      value: 'discount' as keyof Product
    },
    {
      label: 'Hình ảnh',
      value: 'image' as keyof Product
    },
  ]

  const handleAddNew = () => {
    router.push("/admin/product/add-new")
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: PARAMS = {page, rowsPerPage};
        const response = await getProduct(params);
        setRows(response.data.list);
        setTotalPage(response.data.pagination.totalItems)
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      <BaseButton onClick={handleAddNew} className="mb-1">Thêm sản phẩm</BaseButton>
      <BaseTable rows={rows} headers={headerTable}/>
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
    </>
  );
};

export default ListProduct;
