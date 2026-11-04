/** Material Symbols Rounded (fonte auto-hospedada em /fonts) */
export function Icon({ name, fill, size, className = '', label }: { name: string; fill?: boolean; size?: number; className?: string; label?: string }) {
  return (
    <span
      className={`msr ${fill ? 'fill' : ''} ${className}`}
      style={size ? { fontSize: size } : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {name}
    </span>
  )
}
