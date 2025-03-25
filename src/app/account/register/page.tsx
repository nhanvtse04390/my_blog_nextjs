"use client";

import {register as registerUser} from "@/app/api/accountApi"; // Đổi tên để tránh trùng với hook
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import Link from "next/link";
import SocialNetwork from "@/app/components/SocialNetwork";
import LoginRightImg from "@/app/components/LoginRightImg";
import {useError} from "../../components/ErrorProvider";
import {useRouter} from "next/navigation";
import {disabledSate} from "@/app/stores/disabledSate";
import {userInfo} from "@/app/types/userInfo";
import {AxiosError} from "axios";

// 🛠 Define Schema Validation với Zod
const schema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    passwordCompare: z.string().min(6, "Mật khẩu xác nhận phải có ít nhất 6 ký tự"),
    username: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    codeRef: z.string().optional(),
}).refine((data) => data.password === data.passwordCompare, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["passwordCompare"],
});

export default function Register() {
    const {showError, showSuccess} = useError();
    const router = useRouter();
    const {isDisabled, setDisabled} = disabledSate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: userInfo) => {
        setDisabled(true);
        try {
            const res = await registerUser(data);
            showSuccess(res.data.message)
            router.push("/account/login")
        } catch (error) {
            const err = error as AxiosError
            showError(err.message)
        } finally {
            setDisabled(false);
        }
    };

    return (
        <div
          className="flex min-h-screen items-center justify-center bg-slate-400">
            <div className="w-full flex max-w-4xl row p-8 rounded-lg shadow-md bg-white">
                <div className="w-full md:w-1/2 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2 text-black">Đăng ký tài khoản</h2>
                    <span className="mb-6 text-red-400">*Vui lòng điền đầy đủ thông tin của bạn</span>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-black"
                                placeholder="Nhập email"
                            />
                            <p className="text-red-500">{errors.email?.message}</p>
                        </div>

                        {/* Mật khẩu */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">Mật khẩu</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                placeholder="Nhập mật khẩu"
                            />
                            <p className="text-red-500">{errors.password?.message}</p>
                        </div>

                        {/* Nhập lại mật khẩu */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                {...register("passwordCompare")}
                                className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                placeholder="Nhập lại mật khẩu"
                            />
                            <p className="text-red-500">{errors.passwordCompare?.message}</p>
                        </div>

                        {/* Họ tên */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">Họ tên</label>
                            <input
                                type="text"
                                {...register("username")}
                                className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                placeholder="Họ tên"
                            />
                            <p className="text-red-500">{errors.username?.message}</p>
                        </div>

                        {/* Mã giới thiệu */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">Mã giới thiệu</label>
                            <input
                                type="text"
                                {...register("codeRef")}
                                className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                placeholder="Mã giới thiệu"
                            />
                        </div>

                        <div className="text-right">
                            <Link className="underline text-red-400" href="/account/login">
                                *Đăng nhập
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition cursor-pointer mt-5 rounded-3xl flex items-center justify-center ${
                                isDisabled ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isDisabled}
                        >
                            {isDisabled ? (
                                <div className="flex items-center gap-2">
                                    <span
                                        className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                                    Đang xử lý...
                                </div>
                            ) : (
                                "Đăng ký"
                            )}
                        </button>
                        <SocialNetwork/>
                    </form>
                </div>
                <LoginRightImg/>
            </div>
        </div>
    );
}
