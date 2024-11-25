import Image from "next/image"
export default function Loading(){
    return (
        <div className="loading-screen">
            <h1 className="loading-text font-medium text-lg">
                Đang tải...
            </h1>
            <div className="animate-spin"></div>
        </div>
    )
}