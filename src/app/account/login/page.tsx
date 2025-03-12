"use client";

import {login} from "@/app/api/accountApi";
import {useState} from "react";
import {UserLogin} from "@/app/types/userLogin";
import Link from "next/link";
import SocialNetwork from "@/app/components/SocialNetwork";
import LoginRightImg from "@/app/components/LoginRightImg";
import {useError} from "../../components/ErrorProvider";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {disabledSate} from "@/app/stores/disabledSate";
import BaseButton from "@/app/components/BaseButton";

export default function Login() {
    const {showError, showSuccess} = useError();
    const router = useRouter();
    const {isDisabled, setDisabled} = disabledSate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDisabled(true)
        try {
            const res = await login(formData)
            showSuccess(res.data.message);
            router.push("/");
        } catch (error) {
            const err = error as AxiosError;
            showError(err.message);
        } finally {
            setDisabled(false)
        }
    }
    const [formData, setFormData] = useState<UserLogin>({email: "", password: "",});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500/70 via-orange-300 to-pink-500">
            <div className="w-full flex max-w-4xl row p-8 rounded-lg shadow-md bg-gray-800/5">
                <div className="w-full md:w-1/2 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        Đăng nhập
                    </h2>
                    <span className="mb-6">
                        *vui lòng điền đầy đủ thông tin của bạn
                    </span>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-black"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="text-right">
                            <Link
                                className="underline"
                                href="/account/register"
                            >*Tạo tài khoản mới</Link>
                        </div>

                        {/*<button*/}
                        {/*    type="submit"*/}
                        {/*    className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition cursor-pointer mt-5 rounded-3xl"*/}
                        {/*    disabled={isDisabled}*/}
                        {/*>*/}
                        {/*    Đăng nhập*/}
                        {/*</button>*/}
                        <BaseButton type="submit"
                                    className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition cursor-pointer mt-5 rounded-3xl">
                            Đăng nhập
                        </BaseButton>
                        <SocialNetwork/>
                    </form>
                </div>
                <LoginRightImg/>
            </div>
        </div>
    );
}
