import Image from "next/image"
export default function Loading(){
    return (
        <div className="loading-screen">
            <h1 className="loading-text font-medium text-lg">
                Đang tải...
            </h1>
            <Image src="/assets/loading-1.gif" alt="loading" width={24} height={24} />
        </div>
    )
}