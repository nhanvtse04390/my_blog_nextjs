export type BaseButtonProps = {
    onClick?: () => void;
    href?: string;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}