import Skeleton from "@/app/app-components/loading/skeleton"

export default function Loading(
  props : {
    className?: string,
    children?: React.ReactNode
  }
) {
  return (
    <div className={`loading-screen ${props.className}`}>
        <Skeleton className="w-10 h-50"/>
        <Skeleton className="w-full h-50"/>
    </div>
  )
}