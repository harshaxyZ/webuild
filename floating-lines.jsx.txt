import FloatingLines from './FloatingLines';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FloatingLines 
    enabledWaves={["top","middle","bottom"]}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={8}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={8}
    bendRadius={8}
    bendStrength={-2}
    interactive
    parallax={true}
    animationSpeed={1}
    gradientStart="#e945f5"
    gradientMid="#6f6f6f"
    gradientEnd="#6a6a6a"
/>
</div>