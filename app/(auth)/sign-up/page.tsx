'use client'
import "@material/web/textfield/outlined-text-field";
import "@material/web/icon/icon";
import "@material/web/iconbutton/icon-button";
import "@material/web/iconbutton/filled-tonal-icon-button";
// import "@material/web/dialog/dialog";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import "material-symbols";
import FilledButton from "@/app/components/buttons/button";
import TextButton from "@/app/components/buttons/text-button";
import OutlinedButton from "@/app/components/buttons/outline-button";
import DateInput from "@/app/components/inputs/date-input";
import Link from "next/link";

// const lightTheme = createTheme({
//     palette: {
//         mode: "light",
//         primary: {
//             main: "#576421",

//         },
//     },
// });

// const theme = createTheme({
//     palette: {
//         mode: "dark",
//         primary: {
//             main: "#BFCE7F",

//         },

//     },
// });

export default function SignUp() {
    return (
        <div className="flex-col flex items-center justify-center max-w-[560px] w-[80vw] gap-6">
            <Link href="login" className="w-full flex gap-2 text-[--md-sys-color-primary] font-medium">
                <span className="material-symbols-outlined">arrow_back</span>
                Quay về trang đăng nhập
            </Link>
            <div className="self-stretch h-11 flex-col justify-center items-center gap-2.5 flex">
                <div className="text-[--md-sys-color-on-background] text-4xl font-bold">Đăng ký</div>
            </div>
            <div className="py-4 flex-col justify-start items-center gap-9 flex">
                <form className="flex-col justify-start items-center gap-6 flex self-stretch">
                    <div className="flex-col justify-stretch items-start gap-3 flex">
                        <md-outlined-text-field
                            // error={loginError || emailError}
                            className='max-w-[560px] w-[80vw]'
                            label="Email của bạn"
                            // value={email}
                            placeholder='youremail@example.com'
                            type='email'
                            // onChange={handleEmailChange}
                            pattern="^\S+@\S+\.\S+$"
                        >
                            <md-icon slot="leading-icon">email</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field
                            className='max-w-[560px] w-[80vw]'
                            label="Họ và tên"
                            placeholder='Nhập họ và tên của bạn'
                            type='text'
                        >
                            <md-icon slot="leading-icon">person</md-icon>
                        </md-outlined-text-field>
                        {/* <label htmlFor="" className="border-2 pt-2 border-[--md-sys-color-outline] rounded-[4px] max-w-[560px] w-[80vw] flex flex-col px-4 focus:outline-1"> Ngày tháng năm sinh
                            <input aria-label="Ngày tháng năm sinh" type="date" className=" bg-transparent pb-2 text-[--md-sys-color-on-surface] focus:outline-none" />
                        </label> */}
                        <DateInput label="Ngày tháng năm sinh" />
                        <md-outlined-text-field label="Mật khẩu" placeholder="Nhập mật khẩu" type="password" className="max-w-[560px] w-[80vw]">
                            {/* <span className='material-symbols-outlined'>password</span> */}
                            <md-icon slot="leading-icon">password</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field label="Nhập lại mật khẩu" placeholder="Nhập lại mật khẩu" type="password" className="max-w-[560px] w-[80vw]">
                            {/* <span className='material-symbols-outlined'>password</span> */}
                            <md-icon slot="leading-icon">password</md-icon>
                        </md-outlined-text-field>
                    </div>
                    <div className="max-w-[560px] w-[80vw] flex flex-col gap-4 items-center justify-stretch">
                        <FilledButton onClick={() => { }} className='max-w-[560px] w-[80vw]'>
                            Đăng ký
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
                        Đăng ký với Google
                    </OutlinedButton>
                </div>
                <div className="text-center">
                    <span className="text-[--md-sys-color-on-background] text-sm font-medium leading-tight tracking-tight">
                        Đã có tài khoản? Đăng nhập tài khoản
                    </span>
                    <span className="text-black text-sm font-medium leading-tight tracking-tight"> </span>
                    <Link href={"/login"} className="text-[--md-sys-color-primary] text-sm font-medium leading-tight tracking-tight">tại đây</Link>
                </div>
                <p className="font-medium text-center">
                    Bằng việc đăng ký tài khoản, bạn đồng ý với <Link href={"/ToS"}>Chính sách và điều khoản sử dụng</Link> của chúng tôi
                </p>
            </div>
        </div>
    )
}