import Image from "next/image";
import logoTest from "@/app/images/logoTest.jpg";

export default function LoginRightImg() {
    return (
        <div
            className="hidden md:flex w-1/2 bg-gradient-to-t from-black-500/70 to-black rounded-xl text-white p-3">
            <Image
                src={logoTest}
                width={500}
                height={60}
                alt="logo"
                className="cursor-pointer rounded-xl"
            />
        </div>
    )
}