'use client';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail, updateAvatar } from '@/app/services/auth.service';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [verificationStatus, setVerificationStatus] = useState('pending');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

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

    useEffect(() => {
        if (token) {
            verifyEmail(token)
                .then(() => {
                    setVerificationStatus('success');
                })
                .catch((error) => {
                    console.error('Email verification failed:', error);
                    setVerificationStatus('failed');
                });
        }
    }, [token]);

    const handleSkip = () => {
        router.push('/login?verified=true');
    };

    const handleAvatarUpload = async () => {
        if (!avatar) return;
        
        setIsUploading(true);
        try {
            await updateAvatar({ avatar });
            router.push('/login?verified=true');
        } catch (error) {
            console.error('Avatar upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center max-w-md">
                {!token ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Xác thực email</h1>
                        <p className="mb-4">
                            Chúng tôi đã gửi email xác thực đến địa chỉ email của bạn.
                            Vui lòng kiểm tra hộp thư và nhấp vào liên kết xác thực.
                        </p>
                        <p className="text-sm text-[--md-sys-color-on-surface-variant]">
                            Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam
                        </p>
                    </>
                ) : verificationStatus === 'pending' ? (
                    <p>Đang xác thực email của bạn...</p>
                ) : verificationStatus === 'success' ? (
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-2xl font-bold mb-4">Xác thực thành công!</h1>
                        <p className="mb-4">Bạn có muốn tải lên ảnh đại diện không?</p>
                        
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

                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleSkip}
                                className="px-4 py-2 text-[--md-sys-color-primary]"
                            >
                                Bỏ qua
                            </button>
                            <button
                                onClick={handleAvatarUpload}
                                disabled={!avatar || isUploading}
                                className="px-4 py-2 bg-[--md-sys-color-primary] text-[--md-sys-color-on-primary] rounded-full disabled:opacity-50"
                            >
                                {isUploading ? 'Đang tải lên...' : 'Tiếp tục'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4 text-[--md-sys-color-error]">Xác thực thất bại</h1>
                        <p>Đã có lỗi xảy ra trong quá trình xác thực email. Vui lòng thử lại sau.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
} 