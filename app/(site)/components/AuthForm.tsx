'use client';

import axios from "axios";
import { error } from "console";
import { useCallback, useEffect, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { BsGithub, BsGoogle } from 'react-icons/bs';


import Input from "@/app/components/inputs/Input"; // 만약에 @ 이 작동안하면, ../../components/inputs/Input 을 사용하기
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // router가 아니라 navigation 인것 염두하기. 

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status == 'authenticated') {
            // console.log('Authenticated')
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant == 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN')
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // setIsLoading 을 true로 바꿔주는 과정. onsubmit에는 enable our loading 이니까 
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // Axios Register
        if (variant == 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong'))
                .finally(() => setIsLoading(false))
        }

        if (variant == 'LOGIN') {
            // NextAuth SignIn
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid Credentials');
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success('Logged in!');
                        router.push('/users');
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        // NextAuth Social Sign In

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Something went wrong');
                }
                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div
            className="
            mt-8
            sm: mx-auto
            sm: w-full
            sm: max-w-md
            "
        >
            <div
                className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10
            "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant == 'REGISTER' && (
                        <Input
                            id="name"
                            label="Name"
                            register={register} // from formState
                            errors={errors} // from formState
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading} // sign in 버튼을 눌렀을 때, email, pw 키를 disable 하게 만드는 것.
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant == 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                            absolute
                            inset-0
                            flex
                            items-center
                            "
                        >
                            <div className="
                            w-full 
                            border-t 
                            border-gray-300"
                            />
                        </div>
                        <div className="
                        relative
                        flex
                        justify-center
                        text-sm
                        "
                        >
                            <span className="
                            bg-white
                            px-2
                            text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
                ">
                    <div>
                        {variant == 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant == 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;