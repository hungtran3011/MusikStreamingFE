'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'
import 'material-symbols'
import FilledButton from '@/app/components/buttons/button';
import OutlinedButton from '@/app/components/buttons/outline-button';
import Link from 'next/link';
import { useState } from 'react';
// import type { Metadata } from 'next';

export default function LoginPage() {
    const [loginError, setLoginError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    interface FormChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement;
    }

    function handleEmailChange(event: FormChangeEvent): void {
        setEmailError(false);
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: FormChangeEvent): void {
        setLoginError(false);
        setPassword(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setEmailError(true);
            return;
        }

        try {
            // Add your login logic here
            // If login fails, set loginError to true
        } catch {
            setLoginError(true);
        }
    }

    return (
        <div className="flex-col flex items-center justify-center max-w-[560px] w-[80vw] gap-6">
            <div className="self-stretch h-11 flex-col justify-center items-center gap-2.5 flex">
                <div className="text-[--md-sys-color-on-background] text-4xl font-bold">Đăng nhập</div>
            </div>
            <div className="py-4 flex-col justify-start items-center gap-9 flex">
                <form onSubmit={handleSubmit} className="flex-col justify-start items-center gap-6 flex self-stretch">
                    <div className="flex-col justify-stretch items-start gap-3 flex">
                        <md-outlined-text-field
                            error={loginError || emailError}
                            className='max-w-[560px] w-[80vw]'
                            label="Email của bạn"
                            value={email}
                            placeholder='youremail@example.com'
                            type='email'
                            onInput={handleEmailChange}
                            pattern="^\S+@\S+\.\S+$"
                        >
                            <md-icon slot="leading-icon">email</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field 
                            error={loginError} 
                            label="Mật khẩu" 
                            placeholder="Nhập mật khẩu" 
                            value={password} 
                            type="password" 
                            className="max-w-[560px] w-[80vw]"
                            onInput={handlePasswordChange}
                        >
                            <md-icon slot="leading-icon">password</md-icon>
                        </md-outlined-text-field>
                        <Link className='text-center font-medium w-full block text-[--md-sys-color-primary]' href={"/forgot-password"}>Quên mật khẩu? Lấy lại mật khẩu tại đây</Link>
                    </div>
                    <div className="max-w-[560px] w-[80vw] flex flex-col gap-4 items-center justify-stretch">
                        <FilledButton type="submit" className='max-w-[560px] w-[80vw]'>
                            Đăng nhập
                        </FilledButton>
                    </div>
                </form>
                <div className="self-stretch h-[68px] flex-col justify-start items-center gap-3 flex">
                    <div className="h-4 text-center text-[--md-sys-color-on-background] text-sm font-medium leading-tight tracking-tight">hoặc</div>
                    <OutlinedButton
                        onClick={() => { }}
                        showLeadingImg={true}
                        leadingImg={
                            {
                                src: "/assets/google-icon.png",
                                alt: 'Đăng nhập với Google',
                                width: 24
                            }
                        }
                        className='max-w-[560px] w-[80vw]'>
                        Đăng nhập với Google
                    </OutlinedButton>
                </div>
                <div className="text-center">
                    <span className="text-[--md-sys-color-on-background] text-sm font-medium leading-tight tracking-tight">
                        Chưa có tài khoản? Đăng ký tài khoản
                    </span>
                    <span className="text-black text-sm font-medium leading-tight tracking-tight"> </span>
                    <Link href={"/sign-up"} className="text-[--md-sys-color-primary] text-sm font-medium leading-tight tracking-tight">tại đây</Link></div>
            </div>
        </div>
    );
}