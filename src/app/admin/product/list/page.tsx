"use client"
import React, {useEffect, useState} from "react";
import {deleteProduct, getProduct} from "@/app/api/product";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {Product} from "@/app/types/product";
import BaseButton from "@/app/components/BaseButton";
import {useRouter} from "next/navigation";
import BaseTable from "@/app/components/BaseTable";
import {Pagination} from "@mui/material";
import Loading from "@/app/components/Loading";
import ConfirmPopup from "@/app/components/ConfirmPopup";

export type PARAMS = {
  page: number;
  rowsPerPage: number;
};


const ListProduct: React.FC = () => {
  const {showError, showSuccess} = useError();
  const router = useRouter()
  const [rows, setRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [totalItems, setTotalPage] = useState<number>(0)
  const [popupDelete, setPopupDelete] = useState<boolean>(false)
  const [idDelete, setIdDelete] = useState<string>()
  const [shouldRefresh, setShouldRefresh] = useState(false);
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
      value: 'image' as keyof Product,
      isImage: true,
    },
    {
      label: "",
      renderCell: (row: Product) => (
        <div>
          <BaseButton onClick={() => router.push(`/admin/product/add-new?id=${row._id}`)}>
            Chỉnh sửa
          </BaseButton>
          <BaseButton className='ml-1 bg-red-500' onClick={() => handleShowPopupDeleteProduct(row._id)}>
            Xóa
          </BaseButton>
        </div>
      )
    },
  ]
  const handleAddNew = () => {
    router.push("/admin/product/add-new")
  }

  const handleShowPopupDeleteProduct = (id: string) => {
    setPopupDelete(true)
    setIdDelete(id)
  }
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct(idDelete);
      showSuccess(response.data.message)
      setShouldRefresh(!shouldRefresh)
    } catch (error) {
      const err = error as AxiosError;
      showError(err.message);
    } finally {
      setPopupDelete(false)
    }
  }

  const handleCancelDeleteProduct = () => {
    setPopupDelete(false)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: PARAMS = {page, rowsPerPage};
        const response = await getProduct(params);
        const row = response.data.list.map((item:Product)=> ({
          ...item,
          price: item.price.toLocaleString()
        }))
        setRows(row);
        setTotalPage(response.data.pagination.totalItems)
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage, shouldRefresh, showError]);

  if (loading) {
    return <Loading></Loading>;
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
      <ConfirmPopup isOpen={popupDelete} message={"Bạn chắc chắn muốn xóa sản phẩm này"} onConfirm={handleDeleteProduct}
                    onCancel={handleCancelDeleteProduct}></ConfirmPopup>
    </>
  );
};

export default ListProduct;
