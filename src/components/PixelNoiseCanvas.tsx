import React, { useEffect, useRef } from 'react';

interface PixelNoiseCanvasProps {
  seed: string;
  width?: number;
  height?: number;
  entropy?: number;
  showOverlayText?: string;
  className?: string;
}

export const PixelNoiseCanvas: React.FC<PixelNoiseCanvasProps> = ({
  seed,
  width = 240,
  height = 140,
  entropy = 0.998,
  showOverlayText,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deterministic pseudo-random based on seed string
    let seedNum = 0;
    for (let i = 0; i < seed.length; i++) {
      seedNum = (seedNum << 5) - seedNum + seed.charCodeAt(i);
      seedNum |= 0;
    }

    const prng = () => {
      seedNum = (seedNum * 9301 + 49297) % 233280;
      return seedNum / 233280;
    };

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const rand = prng();
      // Steganographic noise palette (cyber emeralds, dark blues, slate blacks with hidden frequency noise)
      if (rand > 0.85) {
        // Emerald noise bit
        data[i] = Math.floor(prng() * 30);
        data[i + 1] = Math.floor(140 + prng() * 115);
        data[i + 2] = Math.floor(100 + prng() * 100);
        data[i + 3] = 255;
      } else if (rand > 0.6) {
        // Cyan quantum bit
        data[i] = Math.floor(prng() * 20);
        data[i + 1] = Math.floor(100 + prng() * 80);
        data[i + 2] = Math.floor(160 + prng() * 95);
        data[i + 3] = 240;
      } else {
        // Dark matrix substrate
        const gray = Math.floor(prng() * 28);
        data[i] = gray;
        data[i + 1] = gray + Math.floor(prng() * 12);
        data[i + 2] = gray + Math.floor(prng() * 16);
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Add subtle matrix grid overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1);
    }
  }, [seed, width, height, entropy]);

  return (
    <div className={`relative overflow-hidden rounded border border-emerald-500/30 bg-black/80 ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full object-cover filter contrast-125"
      />
      {showOverlayText && (
        <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <span className="font-mono text-[10px] text-emerald-400 font-semibold tracking-wider truncate">
            {showOverlayText}
          </span>
          <span className="font-mono text-[9px] text-slate-400">
            ENTROPY: {(entropy * 100).toFixed(2)}% // VLM STEGO VERIFIED
          </span>
        </div>
      )}
      <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/70 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        VLM Matrix
      </div>
    </div>
  );
};
