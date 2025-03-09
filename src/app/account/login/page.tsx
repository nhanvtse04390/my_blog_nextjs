"use client";

export default function Login() {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500/70 via-orange-300 to-pink-500">
            <div className="w-full flex max-w-4xl row p-8 rounded-lg shadow-md bg-gray-800/5">
                <div className="w-1/2 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        Đăng nhập
                    </h2>
                    <span className="mb-6">
                        *vui lòng điền đầy đủ thông tin của bạn
                    </span>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-black"
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-medium mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600 transition cursor-pointer mt-5 rounded-3xl"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
                <div className="w-1/2 bg-gradient-to-t from-black-500/70 to-black rounded-xl text-white p-3">
                    {/*<h1 className="font-bold text-3xl italic">“Mang những sản phẩm tốt nhất đến cho cuộc sống của*/}
                    {/*    bạn”</h1>*/}
                    {/*<h1>*/}
                    {/*    Leo với 200 sản phẩm tốt nhất mong rằng sẽ đáp ứng được mong muốn của quý khách hàng*/}
                    {/*</h1>*/}
                </div>
            </div>
        </div>
    );
}
