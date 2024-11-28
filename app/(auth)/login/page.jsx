'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'
import FilledButton from '@/app/app-components/buttons/filled-button';
import OutlinedButton from '@/app/app-components/buttons/outlined-button';
import Link from 'next/link';
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/services/auth.service';
// import {useTranslation} from 'next/translation';

/**
 * LoginPage component handles the login functionality.
 * It manages form state, validation, and submission.
 * 
 * @return {JSX.Element} The rendered login page component.
 * 
 * @example
 * // To use the LoginPage component, simply import and include it in your JSX:
 * import LoginPage from '@/app/(auth)/login/page';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <LoginPage />
 *     </div>
 *   );
 * }
 */
export default function LoginPage() {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const formReducer = (state, action) => {
        switch (action.type) {
            case "setFormData":
                return { ...state, formData: action.payload };
            case "setErrors":
                return {...state, errors: action.payload};
            case "setStatus":
                return {...state, status: action.payload};
        }
    }

    const initialValue = {
        formData: {
            email: "",
            password: ""
        },
        errors: {
            email: false,
            password: false,
            general: false
        },
        status: {
            isLoading: false,
            errorMessage: null
        }
    }

    const [state, dispatch] = useReducer(formReducer, initialValue);

    const router = useRouter();

    /**
     * Handles changes to the email input field.
     * @param {Object} event - The input change event.
     * @return {void}
     * 
     * @example
     * <input type="email" onChange={handleEmailChange} />
     */
    function handleEmailChange() {
        dispatch({
            type: "setFormData",
            payload: { ...state.formData, email: event.target.value }
        })
        dispatch({
            type: "setErrors",
            payload: {...state.errors, email: event.target.value.match(EMAIL_REGEX), general: false}
        })
    }

    /**
     * Handles changes to the password input field.
     * @param {Object} event - The input change event.
     * @return {void}
     * 
     * @example
     * <input type="password" onChange={handlePasswordChange} />
     */
    function handlePasswordChange(event) {
        dispatch({
            type: "setErrors",
            payload: { ...state.errors, password: length(event.target.value.toString()) >= 8, general: false }
        })
        dispatch({
            type: "setFormData",
            payload: { ...state.formData, password: event.target.value }
        })
    }

    /**
     * Handles form submission.
     * @param {Object} event - The form submission event.
     * @return {Promise<void>} A promise that resolves when the form submission is complete.
     * 
     * @example
     * <form onSubmit={handleSubmit}>
     *   <input type="email" value={formData.email} onChange={handleEmailChange} />
     *   <input type="password" value={formData.password} onChange={handlePasswordChange} />
     *   <button type="submit">Login</button>
     * </form>
     */
    async function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: "setStatus",
            payload: { ...state.status, isLoading: true }
        })

        if (!state.formData.email.match(EMAIL_REGEX)) {
            dispatch({
                type: "setErrors",
                payload: { ...state.errors, email: true }
            })
            dispatch({
                type: "setStatus",
                payload: { ...state.status, isLoading: false }
            })
            return;
        }

        try {
            const response = await login({
                email: formData.email,
                password: formData.password
            });

            if (response.success) {
                dispatch({
                    type: "setErrors",
                    payload: { ...state.errors, general: false }
                })
                router.push('/home'); // Redirect to dashboard after successful login
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            dispatch({
                type: "setErrors",
                payload: { ...state.errors, general: true }
            })
            dispatch({
                type: "setStatus",
                payload: { ...state.status, errorMessage: error.message || "Login failed. Please try again." }
            })
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
                            error={state.errors.email || state.errors.general}
                            className='max-w-[560px] w-[80vw]'
                            label="Email của bạn"
                            value={state.formData.email}
                            placeholder='youremail@example.com'
                            type='email'
                            onInput={handleEmailChange}
                            pattern="^\S+@\S+\.\S+$"
                        >
                            <md-icon slot="leading-icon">email</md-icon>
                        </md-outlined-text-field>
                        <md-outlined-text-field 
                            error={state.errors.password || state.errors.general} 
                            label="Mật khẩu" 
                            placeholder="Nhập mật khẩu" 
                            value={state.formData.password} 
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
                            disabled={state.status.isLoading}
                            className='max-w-[560px] w-[80vw]'
                            onClick={(event) => {
                                handleSubmit(event);
                            }}
                        >
                            {state.status.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </FilledButton>
                        {state.status.errorMessage && (
                            <div className="text-[--md-sys-color-error] text-sm">
                                {state.status.errorMessage}
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