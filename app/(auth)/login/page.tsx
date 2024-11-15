'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'
import 'material-symbols'
import FilledButton from '@/app/components/buttons/button';
import OutlinedButton from '@/app/components/buttons/outline-button';
import { ImageProps } from '@/app/model/image-props';
import Link from 'next/link';
import { useState } from 'react';
// import type { Metadata } from 'next';

export default function LoginPage() {

    interface EmailChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

    function handleEmailChange(event: EmailChangeEvent): void {
        setEmailError(false);
        setEmail(event.target.value);
    }

    const [loginError, setLoginError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex-col flex items-center justify-center max-w-[560px] w-[80vw] gap-6">
            <div className="self-stretch h-11 flex-col justify-center items-center gap-2.5 flex">
                <div className="text-[--md-sys-color-on-background] text-4xl font-bold">Đăng nhập</div>
            </div>
            <div className="py-4 flex-col justify-start items-center gap-9 flex">
                <form className="flex-col justify-start items-center gap-6 flex self-stretch">
                    <div className="flex-col justify-stretch items-start gap-3 flex">
                        {/* <div className="w-[560px] h-14 rounded-tl rounded-tr flex-col justify-start items-start flex">
                            <div className="self-stretch grow shrink basis-0 rounded border border-[--md-sys-color-outline] flex-col justify-start items-start gap-2.5 flex">
                                <div className="self-stretch grow shrink basis-0 pr-4 py-1 rounded-tl rounded-tr justify-start items-start inline-flex">
                                    <div className="w-12 h-12 flex-col justify-center items-center gap-2.5 inline-flex">
                                        <div className="rounded-[100px] justify-center items-center gap-2.5 inline-flex">
                                            <div className="p-2 justify-center items-center gap-2.5 flex">
                                                <div className="w-6 h-6 relative" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grow shrink basis-0 h-12 py-1 flex-col justify-center items-start inline-flex">
                                        <div className="self-stretch justify-start items-center inline-flex">
                                            <div className="grow shrink basis-0 text-[--md-sys-color-on-surface] text-base font-normal leading-normal tracking-wide">Email của bạn</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[560px] h-5 px-4 pt-1 justify-start items-start gap-2.5 inline-flex">
                                <div className="grow shrink basis-0"></div>
                            </div>
                        </div> */}
                        <md-outlined-text-field
                            error={loginError || emailError}
                            className='max-w-[560px] w-[80vw]'
                            label="Email của bạn"
                            value={email}
                            placeholder='youremail@example.com'
                            type='email'
                            onChange={handleEmailChange}
                            pattern="^\S+@\S+\.\S+$"
                        >
                            <md-icon slot="leading-icon">email</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field error={loginError} label="Mật khẩu" placeholder="Nhập mật khẩu" value={password} type="password" className="max-w-[560px] w-[80vw]">
                            {/* <span className='material-symbols-outlined'>password</span> */}
                            <md-icon slot="leading-icon">password</md-icon>
                        </md-outlined-text-field>
                        <Link className='text-right font-medium w-full block text-[--md-sys-color-primary]' href={"/forgot-password"}>Quên mật khẩu? Lấy lại mật khẩu tại đây</Link>
                    </div>
                    <div className="max-w-[560px] w-[80vw] flex flex-col gap-4 items-center justify-stretch">
                        <FilledButton onClick={() => { }} className='max-w-[560px] w-[80vw]'>
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