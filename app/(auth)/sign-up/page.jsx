'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'
import FilledButton from '@/app/components/buttons/filled-button';
import Link from 'next/link';
import { useReducer } from 'react';
import { signUp } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * SignUpPage component handles the user registration process.
 * It includes form validation and submission logic.
 */
export default function SignUpPage() {
    const router = useRouter();
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
    const [revealPassword, setRevealPassword] = useState(false);

    const formReducer = (state, action) => {
        switch (action.type) {
            case 'setFormData':
                return { ...state, formData: action.payload };
            case 'setErrors':
                return { ...state, errors: action.payload };
            case 'setLoading':
                return { ...state, isLoading: action.payload };
            case 'setError':
                return { ...state, errorMessage: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(formReducer, {
        formData: {
            email: "",
            password: "",
            confirmPassword: "",
            name: ""
        },
        errors: {
            email: false,
            password: false,
            confirmPassword: false,
            name: false,
            general: false
        },
        isLoading: false,
        errorMessage: null
    });
    /**
     * Handles input change and updates form data and errors state.
     * @param {string} field - The field name to update.
     * @returns {function} - Event handler function.
     */
    const handleInputChange = (field) => (event) => {
        const newFormData = { ...state.formData, [field]: event.target.value };
        dispatch({
            type: 'setFormData',
            payload: { ...state.formData, [field]: event.target.value }
        });
        dispatch({
            type: 'setErrors',
            payload: { ...state.errors, [field]: !validateField(field, newFormData) }
        });
    }

    const validateField = (field, formData) => {
        switch (field) {
            case "email":
                // return (event) => !event.target.value.match(/^\S+@\S+\.\S+$/);
                return formData.email.match(/^\S+@\S+\.\S+$/);
            case "password":
                console.log(PASSWORD_REGEX.test(formData.password));
                return PASSWORD_REGEX.test(formData.password);
            case "confirmPassword":
                return formData.confirmPassword === state.formData.password;
            case "name":
                return formData.name.trim() !== "";
            default:
                return true;
        }
    }

    const validateForm = () => {
        const { email, password, confirmPassword, name } = state.formData;
        const emailError = !validateField('email', { email });
        const passwordError = !validateField('password', { password });
        const confirmPasswordError = !validateField('confirmPassword', { confirmPassword });
        const nameError = !validateField('name', { name });

        dispatch({
            type: 'setErrors',
            payload: {
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
                name: nameError,
                general: emailError || passwordError || confirmPasswordError || nameError
            }
        });

        return !(emailError || passwordError || confirmPasswordError || nameError);
    }

    /**
     * Handles form submission.
     * @param {object} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({ type: 'setLoading', payload: true });
        dispatch({ type: 'setError', payload: null });

        if (!validateForm()) {
            dispatch({ type: 'setLoading', payload: false });
            return;
        }

        try {
            await signUp(state.formData);
            router.push('/home');
        } catch (error) {
            console.log(error)
            dispatch({ type: 'setError', payload: error.message || 'Sign up failed' });
            dispatch({ type: 'setErrors', payload: { ...state.errors, general: true } });
        } finally {
            dispatch({ type: 'setLoading', payload: false });
        }
    };

    return (
        <div className="flex-col flex items-center justify-center max-w-[560px] w-[80vw] gap-6">
            <div className="self-stretch h-11 flex-col justify-center items-center gap-2.5 flex">
                <div className="text-[--md-sys-color-on-background] text-4xl font-bold">Đăng ký</div>
            </div>
            <form onSubmit={handleSubmit} className="flex-col justify-start items-center gap-6 flex self-stretch">
                <div className="flex-col justify-stretch items-start gap-3 flex w-full">
                    <md-outlined-text-field
                        error={state.errors.name}
                        required={true}
                        className='max-w-[560px] w-[80vw]'
                        label="Tên của bạn"
                        value={state.formData.name}
                        onInput={handleInputChange('name')}
                        autoFocus={true}
                    >
                        <md-icon slot="leading-icon">person</md-icon>
                    </md-outlined-text-field>

                    <md-outlined-text-field
                        error={state.errors.email}
                        className='max-w-[560px] w-[80vw]'
                        label="Email"
                        type="email"
                        value={state.formData.email}
                        onInput={handleInputChange('email')}
                    >
                        <md-icon slot="leading-icon">email</md-icon>
                    </md-outlined-text-field>

                    <md-outlined-text-field
                        error={state.errors.password}
                        className='max-w-[560px] w-[80vw]'
                        label="Mật khẩu"
                        type={!revealPassword ? "password" : ""}
                        value={state.formData.password}
                        onInput={handleInputChange('password')}
                        supportingText={(state.errors.password ? "Mật khẩu phải dài hơn 10 ký tự và chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số" : "")}
                    >
                        <md-icon slot="leading-icon">password</md-icon>
                    </md-outlined-text-field>

                    <md-outlined-text-field
                        error={state.errors.confirmPassword}
                        className='max-w-[560px] w-[80vw]'
                        label="Xác nhận mật khẩu"
                        type={!revealPassword ? "password" : ""}
                        value={state.formData.confirmPassword}
                        onInput={handleInputChange('confirmPassword')}
                        supportingText={(state.errors.confirmPassword && !state.errors.password) ? "Mật khẩu nhập lại không trùng với mật khẩu ban đầu" : ""}
                    >
                        <md-icon slot="leading-icon">password</md-icon>
                    </md-outlined-text-field>
                    <div className='flex gap-3'>
                        <input type="checkbox" name="Hiện mật khẩu" id="reveal_pwd" label="Hiện mật khẩu" onClick={
                            () => {
                                setRevealPassword(!revealPassword)
                            }
                        }/>
                        <label htmlFor="reveal_pwd">Hiện mật khẩu</label>
                    </div>
                </div>

                {state.errorMessage && (
                    <div className="text-[--md-sys-color-error] text-sm">
                        {state.errorMessage}
                    </div>
                )}

                <FilledButton
                    type="submit"
                    disabled={state.isLoading}
                    className='max-w-[560px] w-[80vw]'

                >
                    {state.isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                </FilledButton>

                <div className="text-center">
                    <span className="text-[--md-sys-color-on-background] text-sm">
                        Đã có tài khoản?
                    </span>
                    <Link href="/login" className="text-[--md-sys-color-primary] text-sm ml-1">
                        Đăng nhập
                    </Link>
                </div>
            </form>
        </div>
    );
}