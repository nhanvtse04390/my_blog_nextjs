"use client"
import React, {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import BaseButton from "@/app/components/BaseButton";
import {useRouter} from "next/navigation";
import BaseTable from "@/app/components/BaseTable";
import {Pagination} from "@mui/material";
import Loading from "@/app/components/Loading";
import {getUsersByOrder} from "@/app/api/statistical";
import {UserRef} from "@/app/types/UserRef";

export type PARAMS = {
  page: number;
  rowsPerPage: number;
};


const Statistical: React.FC = () => {
  const {showError} = useError();
  const router = useRouter()
  const [rows, setRows] = useState<UserRef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(20);
  const [totalItems, setTotalPage] = useState<number>(0)

  const headerTable = [
    {
      label: 'Tên người dùng',
      value: 'username' as keyof UserRef
    },
    {
      label: 'email',
      value: 'email' as keyof UserRef
    },
    {
      label: 'Số điện thoại',
      value: 'phone' as keyof UserRef
    },
    {
      label: 'Doanh số',
      value: 'totalAmount' as keyof UserRef
    },
    {
      label: "",
      renderCell: (row: UserRef) => (
        <div>
          <BaseButton onClick={() => router.push(`/admin/users/detail?id=${row._id}`)}>
            Chi tiết
          </BaseButton>
        </div>
      )
    },
  ]


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params: PARAMS = {page, rowsPerPage};
        const response = await getUsersByOrder(params);
        const row: UserRef = response.data.users.map((item: UserRef) => ({
          ...item,
          totalAmount: item.totalAmount.toLocaleString()
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

    fetchUsers();
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

export default Statistical;
