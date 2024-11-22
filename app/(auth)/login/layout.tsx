export const metadata = {
    title: "MusikStreaming | Đăng nhập vào tài khoản của bạn",
    description: "Đăng nhập vào MusikStreaming để trải nghiệm âm nhạc không giới hạn",
    openGraph: {
        title: "MusikStreaming | Đăng nhập vào tài khoản của bạn",
        description: "Đăng nhập vào MusikStreaming để trải nghiệm âm nhạc không giới hạn",
    },
    alternates: {
        canonical: '/login'
    }
}

export default function LoginPageLayout({  
  children,  
}: Readonly<{  
  children: React.ReactNode;  
}>){  
  return (  
      <main className="auth-layout auth-layout--login" role="main" aria-label="Login page">  
      {children}  
      </main>  
  )  
}  