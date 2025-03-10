import Image from "next/image";
import logoTiktok from "@/app/images/tiktok.png";
import logoFB from "@/app/images/logoFb.png";
import logoYT from "@/app/images/logoYt.png";

export default function SocialNetwork() {
    return (
        <div className="flex justify-center">
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white m-2">
                <Image
                    src={logoTiktok}
                    alt="logo"
                    className="cursor-pointer rounded-xl"
                />
            </div>
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white m-2">
                <Image
                    src={logoFB}
                    alt="logo"
                    className="cursor-pointer rounded-xl"
                />
            </div>
            <div
                className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white m-2">
                <Image
                    src={logoYT}
                    alt="logo"
                    className="cursor-pointer rounded-xl p-1"
                />
            </div>
        </div>
    )
}