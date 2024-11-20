'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import FilledButton from '@/app/components/buttons/filled-button';
import Link from 'next/link';
import { useState } from 'react';
import { signUp } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';

/**
 * SignUpPage component handles the user registration process.
 * It includes form validation and submission logic.
 */
export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        name: false,
        general: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    /**
     * Handles input change and updates form data and errors state.
     * @param {string} field - The field name to update.
     * @returns {function} - Event handler function.
     */
    const handleInputChange = (field) => (event) => {
        setErrors(prev => ({ ...prev, [field]: validateField(field), general: false }));
        setFormData(prev => ({ ...prev, [field]: event.target.value }));
    };

    const validateField = (field) => (event) => {
        if (field === 'email') {
            if (!event.target.value.match(/^\S+@\S+\.\S+$/)) {
                // setErrors(prev => ({ ...prev, email: true }));
                return false;
            } else {
                // setErrors(prev => ({ ...prev, email: false }));
                return true;
            }
        } else if (field === 'password') {
            if (event.target.value.length < 8) {
                // setErrors(prev => ({ ...prev, password: true }));
                return false
            } else {
                // setErrors(prev => ({ ...prev, password: false }));
                return true
            }
        }

    }

    /**
     * Validates the form data.
     * @returns {boolean} - Returns true if the form is valid, otherwise false.
     */
    const validateForm = () => {
        const newErrors = { ...errors };
        let isValid = true;

        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            newErrors.email = true;
            isValid = false;
        }
        if (formData.password.length < 8) {
            newErrors.password = true;
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = true;
            isValid = false;
        }
        if (!formData.name.trim()) {
            newErrors.name = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    /**
     * Handles form submission.
     * @param {object} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            await signUp(formData);
            router.push('/home');
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message || 'Sign up failed');
            setErrors(prev => ({ ...prev, general: true }));
        } finally {
            setIsLoading(false);
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
                        error={errors.name}
                        className='max-w-[560px] w-[80vw]'
                        label="Tên của bạn"
                        value={formData.name}
                        onInput={handleInputChange('name')}
                    >
                        <md-icon slot="leading-icon">person</md-icon>
                    </md-outlined-text-field>
                    
                    <md-outlined-text-field
                        error={errors.email}
                        className='max-w-[560px] w-[80vw]'
                        label="Email"
                        type="email"
                        value={formData.email}
                        onInput={handleInputChange('email')}
                    >
                        <md-icon slot="leading-icon">email</md-icon>
                    </md-outlined-text-field>

                    <md-outlined-text-field
                        error={errors.password}
                        className='max-w-[560px] w-[80vw]'
                        label="Mật khẩu"
                        type="password"
                        value={formData.password}
                        onInput={handleInputChange('password')}
                        supportingText={(errors.password ? "Mật khẩu phải dài hơn 8 ký tự" : "")}
                    >
                        <md-icon slot="leading-icon">password</md-icon>
                    </md-outlined-text-field>

                    <md-outlined-text-field
                        error={errors.confirmPassword}
                        className='max-w-[560px] w-[80vw]'
                        label="Xác nhận mật khẩu"
                        type="password"
                        value={formData.confirmPassword}
                        onInput={handleInputChange('confirmPassword')}
                        supportingText={(errors.confirmPassword && !errors.password) ? "Mật khẩu nhập lại không trùng với mật khẩu ban đầu" : ""}
                    >
                        <md-icon slot="leading-icon">password</md-icon>
                    </md-outlined-text-field>
                </div>

                {errorMessage && (
                    <div className="text-[--md-sys-color-error] text-sm">
                        {errorMessage}
                    </div>
                )}

                <FilledButton
                    type="submit"
                    disabled={isLoading}
                    className='max-w-[560px] w-[80vw]'
                >
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
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