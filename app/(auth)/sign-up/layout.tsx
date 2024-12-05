export const metadata = {
    title: "MusikStreaming | Đăng ký tài khoản",
    description: "Đăng ký MusikStreaming để trải nghiệm âm nhạc không giới hạn",
    openGraph: {
        title: "MusikStreaming | Đăng ký tài khoản của bạn",
        description: "Đăng ký MusikStreaming để trải nghiệm âm nhạc không giới hạn",
    },
    alternates: {
        canonical: '/login'
    }
}

export default function SignupPageLayout({  
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