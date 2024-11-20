'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import FilledButton from '@/app/components/buttons/filled-button';
import Link from 'next/link';
import { useState, useReducer } from 'react';
import { signUp } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';

/**
 * SignUpPage component handles the user registration process.
 * It includes form validation and submission logic.
 */
export default function SignUpPage() {
    // const router = useRouter();
    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     name: ""
    // });

    // const [errors, setErrors] = useState({
    //     email: false,
    //     password: false,
    //     confirmPassword: false,
    //     name: false,
    //     general: false
    // });

    // const [isLoading, setIsLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(null);

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
        dispatch({
            type: 'setErrors',
            payload: { ...state.errors, [field]: validateField(field)(event) }
        });
        dispatch({
            type: 'setFormData',
            payload: { ...state.formData, [field]: event.target.value }
        });
    
    };

    const validateField = (field) => {
        switch (field) {
            case "email":
                return (event) => !event.target.value.match(/^\S+@\S+\.\S+$/);
            case "password":
                return (event) => event.target.value.length < 8;
            case "confirmPassword":
                return (event) => event.target.value !== state.formData.password;
            case "name":
                return (event) => !event.target.value.trim();
        }
    }

    /**
     * Validates the form data.
     * @returns {boolean} - Returns true if the form is valid, otherwise false.
     */
    const validateForm = () => {
        const newErrors = { ...state.errors };
        let isValid = true;

        if (!state.formData.email.match(/^\S+@\S+\.\S+$/)) {
            newErrors.email = true;
            isValid = false;
        }
        if (state.formData.password.length < 8) {
            newErrors.password = true;
            isValid = false;
        }
        if (state.formData.password !== state.formData.confirmPassword) {
            newErrors.confirmPassword = true;
            isValid = false;
        }
        if (!state.formData.name.trim()) {
            newErrors.name = true;
            isValid = false;
        }

        dispatch({ type: 'setErrors', payload: newErrors });
        return isValid;
    };

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
                        type="password"
                        value={state.formData.password}
                        onInput={handleInputChange('password')}
                        supportingText={(state.errors.password ? "Mật khẩu phải dài hơn 8 ký tự" : "")}
                    >
                        <md-icon slot="leading-icon">password</md-icon>
                    </md-outlined-text-field>

                    <md-outlined-text-field
                        error={state.errors.confirmPassword}
                        className='max-w-[560px] w-[80vw]'
                        label="Xác nhận mật khẩu"
                        type="password"
                        value={state.formData.confirmPassword}
                        onInput={handleInputChange('confirmPassword')}
                        supportingText={(state.errors.confirmPassword && !state.errors.password) ? "Mật khẩu nhập lại không trùng với mật khẩu ban đầu" : ""}
                    >
                        <md-icon slot="leading-icon">password</md-icon>
                    </md-outlined-text-field>
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