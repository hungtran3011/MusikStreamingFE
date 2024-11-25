import "../globals.css";

/**
 * Props interface for the AuthPage layout component
 */
interface AuthPageProps {
  /** Child components to be rendered within the auth layout */
  children: React.ReactNode;
}

/**
 * AuthPage Layout Component
 * 
 * This component serves as the layout wrapper for authentication-related pages.
 * It provides a centered layout structure with full viewport height and basic HTML setup.
 * 
 * @param {AuthPageProps} props - The component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The rendered auth layout
 */
export default function AuthPage({
  children,
}: Readonly<AuthPageProps>) {
    return (
        <html lang="en">
        <head>
            <meta charSet={"UTF-8"} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Auth</title>
        </head>
        <body className="flex justify-center items-center h-screen">
            {children}
        </body>
        </html>
    );
}