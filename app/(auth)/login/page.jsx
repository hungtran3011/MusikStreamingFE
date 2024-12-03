'use client'
import GoogleLogin from '@/app/(auth)/login/google-login';
import Link from 'next/link';
// import { useReducer } from 'react';
import { redirect } from 'next/navigation';
import { login } from '@/app/services/auth.service';
import LoginForm from '@/app/(auth)/login/login-form';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
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

    /**
     * Handles changes to the email input field.
     * @param {Object} event - The input change event.
     * @return {void}
     * 
     * @example
     * <input type="email" onChange={handleEmailChange} />
     */
    // function handleEmailChange() {
    //     dispatch({
    //         type: "setFormData",
    //         payload: { ...state.formData, email: event.target.value }
    //     })
    //     dispatch({
    //         type: "setErrors",
    //         payload: {...state.errors, email: !event.target.value.match(EMAIL_REGEX), general: false}
    //     })
    // }

    // /**
    //  * Handles changes to the password input field.
    //  * @param {Object} event - The input change event.
    //  * @return {void}
    //  * 
    //  * @example
    //  * <input type="password" onChange={handlePasswordChange} />
    //  */
    // function handlePasswordChange(event) {
    //     dispatch({
    //         type: "setErrors",
    //         payload: { ...state.errors, password: !event.target.value.match(PASSWORD_REGEX), general: false }
    //     })
    //     dispatch({
    //         type: "setFormData",
    //         payload: { ...state.formData, password: event.target.value }
    //     })
    // }

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
    async function handleSubmit(formData) {
        try {
            const { email, password } = formData;
            const res = await login({ email, password });
            
            // Verify cookies were set
            const accessToken = getCookie('access_token');
            if (!accessToken) {
                throw new Error('Failed to set authentication cookies');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { error: error.message };
        }
    }

    return (
        <div className="flex-col flex items-center justify-center max-w-[560px] w-[80vw] gap-6">
            <div className="self-stretch h-11 flex-col justify-center items-center gap-2.5 flex">
                <div className="text-[--md-sys-color-on-background] text-4xl font-bold">Đăng nhập</div>
            </div>
            <div className="py-4 flex-col justify-start items-center gap-9 flex">
                <LoginForm onSubmit={handleSubmit}/>
                <GoogleLogin/>
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