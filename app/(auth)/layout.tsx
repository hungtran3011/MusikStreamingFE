import "../globals.css";

export default function AuthPage({
 children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    return (
        <html lang="en">
        <head>
            <meta charSet={"UTF-8"} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Auth</title>
        </head>
        <body className="flex justify-center items-center h-screen">
            <div className="flex items-center justify-center">
                {children}
            </div> 
        </body>
        </html>
    );
}