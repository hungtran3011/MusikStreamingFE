'use client';
import '@material/web/textfield/outlined-text-field'
import '@material/web/icon/icon'
import '@material/web/iconbutton/icon-button'
import FilledButton from '@/app/components/buttons/filled-button';
import Link from 'next/link';
import { useReducer, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { signUp } from '@/app/services/auth.service';
import Image from 'next/image';

/**
 * SignUpPage component handles the user registration process.
 * It includes form validation and submission logic.
 */
export default function SignUpPage() {
    const router = useRouter();
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
    const [revealPassword, setRevealPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

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

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setAvatar(file);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);
        
        // Clean up preview URL when component unmounts
        return () => URL.revokeObjectURL(previewUrl);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxFiles: 1,
        maxSize: 5242880, // 5MB
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
        const { email, password, confirmPassword, name, file } = state.formData;
        const emailError = !validateField('email', { email });
        const passwordError = !validateField('password', { password });
        const confirmPasswordError = !validateField('confirmPassword', { confirmPassword });
        const nameError = !validateField('name', { name });
        const fileError = !validateField('file', { file });

        dispatch({
            type: 'setErrors',
            payload: {
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
                name: nameError,
                file: fileError,
                general: emailError || passwordError || confirmPasswordError || nameError || fileError
            }
        });

        return !(emailError || passwordError || confirmPasswordError || nameError || fileError);
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
            await signUp({
                email: state.formData.email,
                password: state.formData.password,
                name: state.formData.name,
                file: state.formData.file
            });
            router.push('/verify-email');
        } catch (error) {
            console.error(error);
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
                    <div {...getRootProps()} className="cursor-pointer w-full flex flex-col items-center gap-2">
                        <input {...getInputProps()} />
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-[--md-sys-color-outline] hover:border-[--md-sys-color-primary] transition-colors">
                            {avatarPreview ? (
                                <Image 
                                    src={avatarPreview} 
                                    alt="Avatar preview" 
                                    width={128} 
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[--md-sys-color-surface-variant]">
                                    <md-icon>add_photo_alternate</md-icon>
                                </div>
                            )}
                        </div>
                        <span className="text-sm text-[--md-sys-color-on-surface-variant]">
                            Click để tải lên ảnh đại diện
                        </span>
                    </div>

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