<script>
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let ctx;
  let canvasWidth = $state(0);
  let canvasHeight = $state(0);
  const pixelSize = 4;
  const radius = 200;
  let cols = $derived(Math.ceil(canvasWidth / pixelSize));
  let rows = $derived(Math.ceil(canvasHeight / pixelSize));

  const randomColor = () => {
    const r = Math.random() * 100;
    const g = Math.random() * 100;
    const b = Math.random() * 100;
    return `rgb(${r}%, ${g}%, ${b}%)`;
  };

  const drawStaticNoise = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = randomColor(1);
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  };

  const updateNoise = (x, y) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pixelX = col * pixelSize;
        const pixelY = row * pixelSize;

        const distance = Math.sqrt((pixelX - x) ** 2 + (pixelY - y) ** 2);

        if (distance < radius) {
          const p = 1 - distance / radius;
          if (Math.random() < p*p*p) {
            ctx.fillStyle = randomColor();
            ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
          }
        }
      }
    }
  };

  const resizeCanvas = () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStaticNoise();
  };

  onMount(() => {
    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (event) => {
      updateNoise(event.clientX, event.clientY);
    });

    onDestroy(() => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', updateNoise);
    });
  });
</script>

<canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>

<style>
  canvas {
    display: block;
  }
</style>
