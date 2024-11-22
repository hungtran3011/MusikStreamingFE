import axios from 'axios';

interface SignUpData {
    email: string;
    password: string;
    name: string;
    profilePicture?: File;
    country: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    message?: string;
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signup`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Sign up failed');
    }
}

export async function login(data: LoginData): Promise<AuthResponse> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signin`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        throw new Error('Login failed');
    }
}
