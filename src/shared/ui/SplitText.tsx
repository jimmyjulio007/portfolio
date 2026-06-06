interface SplitTextProps {
  children: string;
  className?: string;
}

/**
 * SplitText component for character-based animations.
 * Automatically splits a string into individual animatable spans.
 */
export function SplitText({ children, className }: SplitTextProps) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {children.split("").map((char, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static fixed-order list
          key={`${char}-${i}`}
          className="char inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
