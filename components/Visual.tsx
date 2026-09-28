import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  // Partie de la photo à garder visible dans le cadre (ex. "center top"),
  // réglable dans l'admin quand le cadre est plus étroit que la photo.
  // "center" (recadrage automatique) si absent.
  objectPosition?: string;
};

export default function Visual({
  src,
  alt = "",
  sizes = "100vw",
  priority,
  className = "",
  objectPosition,
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-2 via-surface to-background ${className}`}
    >
      <Image
        src="/brand/logo-icon.png"
        alt=""
        width={160}
        height={160}
        className="w-1/3 max-w-[160px] opacity-[0.14]"
      />
    </div>
  );
}
