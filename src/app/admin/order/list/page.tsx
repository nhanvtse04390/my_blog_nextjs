"use client"
import React, {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import BaseButton from "@/app/components/BaseButton";
import {useRouter} from "next/navigation";
import BaseTable from "@/app/components/BaseTable";
import {Pagination} from "@mui/material";
import Loading from "@/app/components/Loading";
import {getListOrder} from "@/app/api/order";
import {orderItem} from "@/app/types/OrderItem";
import moment from "moment/moment";
import {OrderListRespone} from "@/app/types/OrderListRespone";

export type PARAMS = {
  page: number;
  rowsPerPage: number;
};

const ListOrder: React.FC = () => {
  const {showError} = useError();
  const router = useRouter()
  const [rows, setRows] = useState<orderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [totalItems, setTotalPage] = useState<number>(0)
  const headerTable = [
    {
      label: 'Nguời mua',
      value: 'userName' as keyof orderItem
    },
    {
      label: 'Số điện thoại',
      value: 'userPhone' as keyof orderItem
    },
    {
      label: 'Địa chỉ ship',
      value: 'shippingAddress' as keyof orderItem
    },
    {
      label: 'Giá',
      value: 'totalAmount' as keyof orderItem
    },
    {
      label: 'Trạng thái đơn hàng',
      value: 'orderStatus' as keyof orderItem
    },
    {
      label: 'Phương thức thanh toán',
      value: 'paymentMethod' as keyof orderItem
    },
    {
      label: 'Ngày tạo',
      value: 'createdAt' as keyof orderItem
    },
    {
      label: "",
      renderCell: (row: orderItem) => (
        <div>
          <BaseButton onClick={() => router.push(`/admin/add-new?id=${row._id}`)}>
            Chỉnh sửa
          </BaseButton>
        </div>
      )
    },
  ]


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params: PARAMS = {page, rowsPerPage};
        const response = await getListOrder(params);
        let row: orderItem[] = [];
        if(response.data.list && response.data.list.length) {
          row = response.data.list.map((item: OrderListRespone) => ({
            _id: item._id,
            userName: item.userId.username,
            userPhone: item.userId.phone,
            totalAmount: item.totalAmount,
            shippingAddress: item.shippingAddress,
            paymentStatus: item.paymentStatus,
            orderStatus: item.orderStatus === "pending" ? "Chưa giao hàng": item.orderStatus,
            paymentMethod: item.paymentMethod === "COD" ? "Thanh toán khi nhận hàng": item.paymentMethod,
            createdAt: moment(item.createdAt).format("DD-MM-YYYY")
          }));
        }
        setRows(row);
        setTotalPage(response.data.pagination.totalItems)
      } catch (error) {
        const err = error as AxiosError;
        showError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, rowsPerPage, showError]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
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

export default ListOrder;
