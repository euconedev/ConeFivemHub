import Link from "next/link"
import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <Image src="/conestudios.png" alt="Cone Studios Logo" width={70} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-white leading-none mt-0.5">Premium FiveM Assets</span>
      </div>
    </Link>
  )
}
