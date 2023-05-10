'use client';

import clsx from 'clsx';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined; // ? 의 의미는 속성이 선택적(optional)임을 나타내는 TypeScript 문법. 
    fullWidth?: boolean; // 즉, ? 는 이렇게 정의된 속성이 있을 수도 있고 없을 수도 있음을 의미함.
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            test-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2    
        `,
                disabled && "opacity-50 cursor-default",
                fullWidth && "w-full",
                secondary ? 'text-gray-900' : 'text-white',
                danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
                // secondary 도 아니고 danger 도 아니면
                !secondary && !danger && "bg-sky-500 hober:bg-sky-600 focus-visible:outline-sky-600"
            )}
        >
            {children}
        </button>

    );
}

export default Button;