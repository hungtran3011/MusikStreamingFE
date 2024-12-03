import axios from 'axios';
import z from 'zod';
import { setCookie } from 'cookies-next/client';
import { FileWithPath } from 'react-dropzone';

interface SignUpData {
    email: string;
    password: string;
    name: string;
    country: string;
    file: FileWithPath;
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
    session?: {
        access_token?: string;
        expires_in?: number;
        refresh_token?: string;
    }
}

const AuthResponse = z.object({
    user: z.object({
        id: z.string(),
        aud: z.string(),
        role: z.string().optional(),
    }),
    session: z.object({
        access_token: z.string().optional(),
        expires_in: z.number().optional(),
        refresh_token: z.string().optional(),
    }).optional(),
})

const AuthResponseError = z.object({
    error: z.string(),
})

async function countryFromCoords(coords: GeolocationCoordinates): Promise<string> {
    const { latitude, longitude } = coords;
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const country = response.data.address.country_code;
    return country;
}

async function getCountryCode(): Promise<string> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            return countryFromCoords(position.coords);
        });
    }
    return '';
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
    //get country code from ip address
    const country = await getCountryCode();
    data.country = country;
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

        if (response.status !== 200) {
            const resError = AuthResponseError.parse(response.data);
            throw new Error(resError.error);
        }

        const resData = AuthResponse.parse(response.data);
        return resData;
    } catch (error: unknown) {
        console.error(error);
        throw new Error('Sign up failed: ' + (error instanceof Error ? error.message : String(error)));
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
        
        if (!resData.session) {
            return resData;
        }

        // Calculate expiration date with default 1 hour expiration
        const expires = new Date(Date.now() + (resData.session.expires_in ?? 3600) * 1000);
        
        // Set client-side cookies with proper attributes
        setCookie('access_token', resData.session.access_token, {
            expires,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: resData.session.expires_in
        });
        
        setCookie('refresh_token', resData.session.refresh_token, {
            expires,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: resData.session.expires_in
        });

        setCookie('user_name', resData.user.id, {
            expires,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: resData.session.expires_in
        });

        return resData;
    } catch (error: unknown) {
        console.error(error);
        throw new Error('Login failed: ' + (error instanceof Error ? error.message : String(error)));
    }
}

export async function verifyEmail(token: string): Promise<void> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify-email`,
            { token },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status !== 200) {
            throw new Error('Email verification failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Email verification failed');
    }
}
