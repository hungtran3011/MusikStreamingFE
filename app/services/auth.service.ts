import axios from 'axios';
import z from 'zod';

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
    user: {
        id: string;
        aud: string;
        role?: string;
    }
    session: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
    }
}

const AuthResponse = z.object({
    user: z.object({
        id: z.string(),
        aud: z.string(),
        role: z.string().optional(),
    }),
    session: z.object({
        access_token: z.string(),
        expires_in: z.number(),
        refresh_token: z.string(),
    }),
})

const AuthResponseError = z.object({
    error: z.string(),
})

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
        if (response.status !== 200) {
            const resError = AuthResponseError.parse(response.data);
            throw new Error(resError.error);
        }
        const resData = AuthResponse.parse(response.data);
        if (resData.session.access_token) {
            localStorage.setItem('accessToken', resData.session.access_token);
        }
        if (resData.session.refresh_token) {
            localStorage.setItem('refreshToken', resData.session.refresh_token);
        }

        return resData;

    } catch (error: unknown) {
        console.error(error);
        throw new Error('Login failed' + error);
    }
}
