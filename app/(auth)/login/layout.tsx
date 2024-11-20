export const metadata = {
    title: "MusikStreaming | Đăng nhập vào tài khoản của bạn"
}

export default function LoginPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div className="login">
        {children}
        </div>
    )
}