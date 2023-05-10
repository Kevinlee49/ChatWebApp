"use client ";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
    icon: Icon,
    href,
    onClick,
    active
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link href={href}
            onClick={onClick}
            className={clsx(`
                group
                flex
                gap-x-3
                w-full
                justify-center
                p-4
                text-sm
                leading-6
                font-semibold
                text-gray-500
                hover:text-black
                hover:bg-gray-100
                `,
                active && 'bg-gray-100 text-black'
            )}
        >
            <Icon className="h-6 w-6" />
        </Link>
    );
}

export default MobileItem;
