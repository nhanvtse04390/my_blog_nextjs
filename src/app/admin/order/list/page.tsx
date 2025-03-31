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
import {OrderListResponse} from "@/app/types/OrderListResponse";

export type PARAMS = {
  page: number;
  rowsPerPage: number;
};

const orderStatusList = ["pending", "confirmed", "shipped", "delivered", "canceled"];


const ListOrder: React.FC = () => {
  const {showError} = useError();
  const router = useRouter()
  const [rows, setRows] = useState<orderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [totalItems, setTotalPage] = useState<number>(0)
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

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
          <BaseButton onClick={() => router.push(`/admin/order/edit?id=${row._id}`)}>
            Chỉnh sửa
          </BaseButton>
        </div>
      )
    },
  ]
  const fetchOrders = async () => {
    try {
      const params: PARAMS = {page, rowsPerPage, selectedStatus};
      const response = await getListOrder(params);
      let row: orderItem[] = [];
      if (response.data.list && response.data.list.length) {
        row = response.data.list.map((item: OrderListResponse) => ({
          _id: item._id,
          userName: item.userId.username,
          userPhone: item.userId.phone,
          totalAmount: item.totalAmount.toLocaleString(),
          shippingAddress: item.shippingAddress,
          paymentStatus: item.paymentStatus,
          orderStatus: item.orderStatus === "pending" ? "Chưa giao hàng" : item.orderStatus === "confirmed" ? "Đã xác nhận" : item.orderStatus === "shipped" ? "Đang ship"
            : item.orderStatus === "delivered" ? "Đã giao hàng" : item.orderStatus === "canceled" ? "Đã hủy" : "",
          paymentMethod: item.paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : item.paymentMethod,
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

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, showError]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  if (loading) {
    return <Loading></Loading>;
  }

  const handleFilter = () => {
    fetchOrders()
    console.log("ok")
  }

  return (
    <>
      <div className="flex gap-4 my-4">
        {orderStatusList.map((status) => (
          <label key={status} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStatus.includes(status)}
              onChange={() => handleStatusChange(status)}
              className="w-4 h-4"
            />
            {status === "pending" ? "Chưa giao hàng" : status === "confirmed" ? "Đã xác nhận" : status === "shipped" ? "Đang ship"
              : status === "delivered" ? "Đã giao hàng" : status === "canceled" ? "Đã hủy" : ""}
          </label>
        ))}
        <BaseButton onClick={handleFilter}>
          Lọc
        </BaseButton>
      </div>
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
