import Link from "next/link"
import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center font-bold text-white text-xl glow-primary">
          C
        </div>
      </div>
      <div className="flex flex-col">
        <Image src="/conestudios.png" alt="Cone Studios Logo" width={120} height={40} />
        <span className="text-xs text-muted-foreground leading-none mt-0.5">Premium FiveM Assets</span>
      </div>
    </Link>
  )
}
