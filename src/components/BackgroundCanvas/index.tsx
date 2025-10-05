import { component$, useSignal, useOnWindow, $, useOnDocument, useTask$ } from '@builder.io/qwik';
import styles from './backgroundCanvas.module.css';

export interface BackgroundCanvasProps {
  /**
   * Specify css classes for the child of the BackgroundCanvas.
   */
  points?: number;
  maxPoints?: number;
  distanceThreshold?: number;
}

export const BackgroundCanvas = component$<BackgroundCanvasProps>((props) => {
  const canvasRef = useSignal<HTMLCanvasElement>();
  const windowWidth = useSignal<number>();
  const windowHeight = useSignal<number>();
  const pointList = useSignal<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const POINT_COUNT = props.points ?? 60;
  const MAX_POINTS = props.maxPoints ?? 100;
  const DIST_THRESHOLD = props.distanceThreshold ?? 150;

  useOnDocument(
    'click',
    $((event: MouseEvent) => {
      pointList.value.push({
        x: event.x,
        y: event.y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
      pointList.value = pointList.value.slice(-MAX_POINTS); // Limit the number of points
    }),
  );

  useOnWindow(['resize', 'load'], $(() => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;

    pointList.value = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      pointList.value.push({
        x: Math.random() * windowWidth.value,
        y: Math.random() * windowHeight.value,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
    pointList.value = [...pointList.value];
  }));

  useTask$(({ track, cleanup }) => {
    track(() => windowHeight.value);
    track(() => windowWidth.value);
    track(() => pointList.value);

    const width = windowWidth.value;
    const height = windowHeight.value;
    if (!width || !height) return;

    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    /**
     * Get the used color (--color-bg-grey) with the specified opacity.
     * @param opacity The opacity level (0 to 1).
     * @returns The background color as an RGBA string.
     */
    const getColor = (opacity = 1) => {
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue('--color-bg-grey').trim();
      const rgb = color
        .replace(/^#/, '')
        .match(/.{2}/g)
        ?.map((hex) => parseInt(hex, 16))
        .join(',');
      return `rgba(${rgb}, ${opacity})`;
    };


    let frameId: NodeJS.Timeout | undefined;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getColor();
      for (let i = 0; i < pointList.value.length; i++) {
        const p = pointList.value[i];
        // Update position based on velocity
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off the edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw the point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to other points within the distance threshold
        for (let j = i + 1; j < pointList.value.length; j++) {
          const q = pointList.value[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DIST_THRESHOLD) {
            const opacity = 1 - dist / DIST_THRESHOLD;
            ctx.strokeStyle = getColor(opacity);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      frameId = setTimeout(draw, 1000 / 60); // ≈60fps
    };
    draw();

    cleanup(() => {
      if (frameId !== undefined) {
        clearTimeout(frameId);
      }
    });
  });

  return (
    <canvas ref={canvasRef} class={styles.canvas} />
  );
});
