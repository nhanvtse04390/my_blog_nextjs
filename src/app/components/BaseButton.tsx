import React from "react";
import Link from "next/link";
import {BaseButtonProps} from "@/app/types/BaseButtonProps";


const BaseButton: React.FC<BaseButtonProps> = ({
                                                   onClick,
                                                   href,
                                                   loading = false,
                                                   disabled = false,
                                                   children,
                                                   className = "",
                                                   type = "button",
                                               }) => {
    const buttonContent = (
        <button
            onClick={onClick}
            disabled={loading || disabled}
            className={`px-4 py-2 rounded bg-blue-500 text-white cursor-pointer ${className} ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            type={type}
        >
            {loading ? "Loading ..." : children}
        </button>
    );

    return href ? <Link href={href}>{buttonContent}</Link> : buttonContent;
};

export default BaseButton;
