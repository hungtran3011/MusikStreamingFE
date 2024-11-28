import { cn } from "@/lib/utils"

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[--md-sys-color-surface-container-high]", className)}
      role="status"
      aria-label="loading"
      {...props}
    />
  )
}