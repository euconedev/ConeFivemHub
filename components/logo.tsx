import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-xl glow-primary">
          C
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none text-foreground">ConeFiveM Hub</span>
        <span className="text-xs text-muted-foreground leading-none mt-0.5">by Cone Dev</span>
      </div>
    </Link>
  )
}
