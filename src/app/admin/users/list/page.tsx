"use client"
import React, {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useError} from "@/app/components/ErrorProvider";
import {User} from "@/app/types/User";
import BaseButton from "@/app/components/BaseButton";
import {useRouter} from "next/navigation";
import BaseTable from "@/app/components/BaseTable";
import {Pagination} from "@mui/material";
import Loading from "@/app/components/Loading";
import {getUsers} from "@/app/api/user";

export type PARAMS = {
    page: number;
    rowsPerPage: number;
};


const ListUsers: React.FC = () => {
    const {showError} = useError();
    const router = useRouter()
    const [rows, setRows] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const [totalItems, setTotalPage] = useState<number>(0)
    const headerTable = [
        {
            label: 'Tên người dùng',
            value: 'username' as keyof User
        },
        {
            label: 'email',
            value: 'email' as keyof User
        },
        {
            label: 'Mã giới thiệu',
            value: 'codeRef' as keyof User
        },
        {
            label: 'Thời gian tạo',
            value: 'createdAt' as keyof User
        },
        {
            label: "",
            renderCell: (row: User) => (
                <BaseButton onClick={() => router.push(`/admin/product/add-new?id=${row._id}`)}>
                    Chỉnh sửa
                </BaseButton>
            )
        },
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const params: PARAMS = {page, rowsPerPage};
                const response = await getUsers(params);
                setRows(response.data.list);
                setTotalPage(response.data.pagination.totalItems)
            } catch (error) {
                const err = error as AxiosError;
                showError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, rowsPerPage]);

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <>
            <div className="flex justify-center px-4 z-1 text-3xl mb-1 uppercase">
                <h1>Danh sách người dùng</h1>
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

export default ListUsers;
