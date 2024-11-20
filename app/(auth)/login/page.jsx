'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'
import 'material-symbols'
import FilledButton from '@/app/components/buttons/filled-button';
import OutlinedButton from '@/app/components/buttons/outlined-button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/services/auth.service';

/**
 * LoginPage component handles the login functionality.
 * It manages form state, validation, and submission.
 */
export default function LoginPage() {
    // Form data state
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Form error states
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        general: false
    });

    // Form status state
    const [status, setStatus] = useState({
        isLoading: false,
        errorMessage: null
    });

    const router = useRouter();

    /**
     * Handles changes to the email input field.
     * @param {Object} event - The input change event.
     */
    function handleEmailChange(event) {
        setErrors(prev => ({ ...prev, email: false, general: false }));
        setFormData(prev => ({ ...prev, email: event.target.value }));
    }

    /**
     * Handles changes to the password input field.
     * @param {Object} event - The input change event.
     */
    function handlePasswordChange(event) {
        setErrors(prev => ({ ...prev, password: false, general: false }));
        setFormData(prev => ({ ...prev, password: event.target.value }));
    }

    /**
     * Handles form submission.
     * @param {Object} event - The form submission event.
     */
    async function handleSubmit(event) {
        event.preventDefault();
        setStatus(prev => ({ ...prev, isLoading: true }));

        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            setErrors(prev => ({ ...prev, email: true }));
            setStatus(prev => ({ ...prev, isLoading: false }));
            return;
        }

        try {
            const response = await login({
                email: formData.email,
                password: formData.password
            });

            if (response.success) {
                setStatus(prev => ({
                    ...prev,
                    isLoading: false,
                    errorMessage: null
                }));
                router.push('/home'); // Redirect to dashboard after successful login
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, general: true }));
            setStatus(prev => ({
                ...prev,
                isLoading: false,
                errorMessage: error.message || "Login failed. Please try again."
            }));
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
                            error={errors.email || errors.general}
                            className='max-w-[560px] w-[80vw]'
                            label="Email của bạn"
                            value={formData.email}
                            placeholder='youremail@example.com'
                            type='email'
                            onInput={handleEmailChange}
                            pattern="^\S+@\S+\.\S+$"
                        >
                            <md-icon slot="leading-icon">email</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field 
                            error={errors.password || errors.general} 
                            label="Mật khẩu" 
                            placeholder="Nhập mật khẩu" 
                            value={formData.password} 
                            type="password" 
                            className="max-w-[560px] w-[80vw]"
                            onInput={handlePasswordChange}
                        >
                            <md-icon slot="leading-icon">password</md-icon>
                        </md-outlined-text-field>
                        <Link className='text-center font-medium w-full block text-[--md-sys-color-primary]' href={"/forgot-password"}>Quên mật khẩu? Lấy lại mật khẩu tại đây</Link>
                    </div>
                    <div className="max-w-[560px] w-[80vw] flex flex-col gap-4 items-center justify-stretch">
                        <FilledButton 
                            disabled={status.isLoading}
                            className='max-w-[560px] w-[80vw]'
                            onClick={(event) => {
                                handleSubmit(event);
                            }}
                        >
                            {status.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </FilledButton>
                        {status.errorMessage && (
                            <div className="text-[--md-sys-color-error] text-sm">
                                {status.errorMessage}
                            </div>
                        )}
                    </div>
                </form>
                <div className="self-stretch h-[68px] flex-col justify-start items-center gap-3 flex">
                    <div className="h-4 text-center text-[--md-sys-color-on-background] text-sm font-medium leading-tight tracking-tight">hoặc</div>
                    <OutlinedButton
                        onClick={() => { }}
                        showLeadingImg={true}
                        leadingImg={{
                            src: "/assets/google-icon.png",
                            alt: 'Đăng nhập với Google',
                            width: 24
                        }}
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
            </div >
        </div >
    );
}