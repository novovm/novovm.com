"use client";

import { useEffect, useRef } from "react";

export function MagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const spacing = 52;
    const pullRadius = 240;

    type Node = {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    };

    let nodes: Node[][] = [];

    const initGrid = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      nodes = [];
      for (let i = 0; i < cols; i++) {
        const col: Node[] = [];
        for (let j = 0; j < rows; j++) {
          col.push({
            baseX: i * spacing,
            baseY: j * spacing,
            x: i * spacing,
            y: j * spacing,
            vx: 0,
            vy: 0,
          });
        }
        nodes.push(col);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Physics update
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].length; j++) {
          const node = nodes[i][j];
          
          const dx = mouse.current.x - node.baseX;
          const dy = mouse.current.y - node.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = node.baseX;
          let targetY = node.baseY;

          // If mouse is near, pull nodes towards mouse
          if (dist < pullRadius) {
            const force = (pullRadius - dist) / pullRadius;
            targetX = node.baseX + dx * force * 0.35;
            targetY = node.baseY + dy * force * 0.35;
          }

          // Spring physics
          node.vx += (targetX - node.x) * 0.12; 
          node.vy += (targetY - node.y) * 0.12;
          node.vx *= 0.75; // Friction
          node.vy *= 0.75;
          
          node.x += node.vx;
          node.y += node.vy;
        }
      }

      // Drawing lines
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].length; j++) {
          const node = nodes[i][j];

          const dx = mouse.current.x - node.x;
          const dy = mouse.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isHovered = dist < pullRadius;
          
          // Compute line color intensity
          const defaultAlpha = 0.006;
          const hoverAlpha = isHovered ? Math.max(0.05, (1 - dist / pullRadius) * 0.34) : defaultAlpha;
          
          // Lines to the right
          if (i < nodes.length - 1) {
            const rightNode = nodes[i + 1][j];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(rightNode.x, rightNode.y);
            
            if (isHovered) {
              ctx.strokeStyle = `rgba(90, 181, 70, ${hoverAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(90, 181, 70, ${defaultAlpha})`;
            }
            ctx.stroke();
          }

          // Lines below
          if (j < nodes[i].length - 1) {
            const bottomNode = nodes[i][j + 1];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(bottomNode.x, bottomNode.y);

            if (isHovered) {
              ctx.strokeStyle = `rgba(90, 181, 70, ${hoverAlpha})`;
            } else {
              ctx.strokeStyle = `rgba(90, 181, 70, ${defaultAlpha})`;
            }
            ctx.stroke();
          }
        }
      }

      if (mouse.current.x > -500 && mouse.current.y > -500) {
        const glow = ctx.createRadialGradient(
          mouse.current.x,
          mouse.current.y,
          0,
          mouse.current.x,
          mouse.current.y,
          pullRadius * 0.9,
        );
        glow.addColorStop(0, "rgba(99, 185, 95, 0.18)");
        glow.addColorStop(0.36, "rgba(90, 181, 70, 0.12)");
        glow.addColorStop(1, "rgba(90, 181, 70, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, pullRadius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    initGrid();
    draw();

    window.addEventListener("resize", initGrid);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", initGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
