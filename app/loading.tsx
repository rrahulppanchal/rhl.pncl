export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="font-mono text-center">

        {/* Animated bars */}
        <div className="flex items-end justify-center gap-1 mb-8 h-12">
          {[0, 1, 2, 3, 4].map(i => (
            <span
              key={i}
              className="w-1 bg-primary inline-block animate-[pulse-glow_1s_ease-in-out_infinite]"
              style={{
                height: `${[24, 36, 48, 36, 24][i]}px`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.4 + i * 0.12,
              }}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm mb-2">
          <span className="text-primary animate-[blink_1s_step-end_infinite]">▋</span>
          {' '}loading...
        </p>
        <p className="text-muted-foreground/40 text-xs">please wait</p>

      </div>
    </div>
  );
}
