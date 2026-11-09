import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { sound } from '../utils/audio';

export default function HeroPhysics({ isPlaying, onTogglePlay }) {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const ballsRef = useRef([]);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const {
      Engine,
      Runner,
      Bodies,
      Composite,
      Body,
      Events,
    } = Matter;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Create engine with zero gravity by default (floating drift)
    const engine = Engine.create({
      gravity: { x: 0, y: isPlaying ? 1.2 : 0, scale: 0.001 }
    });
    engineRef.current = engine;

    // Create custom Canvas renderer
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.className = 'absolute inset-0 w-full h-full';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Walls & boundaries
    const wallThickness = 120;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { isStatic: true, friction: 0.2, restitution: 0.85 });
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, { isStatic: true, friction: 0.2, restitution: 0.85 });
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, friction: 0.2, restitution: 0.85 });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, friction: 0.2, restitution: 0.85 });

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Create floating balls matching the reference image:
    const isMobile = window.innerWidth < 768;
    const ballConfigs = isMobile
      ? [
          { r: 42, color: '#D0003A', x: width * 0.8, y: height * 0.4 },
          { r: 24, color: '#007A3D', x: width * 0.2, y: height * 0.15 },
          { r: 16, color: '#D0003A', x: width * 0.35, y: height * 0.12 },
          { r: 20, color: '#007A3D', x: width * 0.65, y: height * 0.18 },
          { r: 12, color: '#D0003A', x: width * 0.75, y: height * 0.55 },
          { r: 14, color: '#007A3D', x: width * 0.15, y: height * 0.6 },
        ]
      : [
          // Huge red statement ball matching reference right side
          { r: 66, color: '#D0003A', x: width * 0.88, y: height * 0.42 },
          { r: 12, color: '#D0003A', x: width * 0.82, y: height * 0.38 },
          // Top scatter sequence (like the row of green/red dots over the first word)
          { r: 24, color: '#007A3D', x: width * 0.18, y: height * 0.12 },
          { r: 18, color: '#D0003A', x: width * 0.24, y: height * 0.10 },
          { r: 26, color: '#007A3D', x: width * 0.30, y: height * 0.13 },
          { r: 20, color: '#D0003A', x: width * 0.52, y: height * 0.14 },
          { r: 28, color: '#007A3D', x: width * 0.58, y: height * 0.11 },
          { r: 22, color: '#007A3D', x: width * 0.64, y: height * 0.15 },
          // Mid & lower floating accents
          { r: 16, color: '#D0003A', x: width * 0.12, y: height * 0.45 },
          { r: 34, color: '#007A3D', x: width * 0.28, y: height * 0.70 },
          { r: 20, color: '#D0003A', x: width * 0.72, y: height * 0.65 },
          { r: 16, color: '#007A3D', x: width * 0.86, y: height * 0.68 },
        ];

    const balls = ballConfigs.map((cfg) => {
      const body = Bodies.circle(cfg.x, cfg.y, cfg.r, {
        restitution: 0.88,
        friction: 0.05,
        frictionAir: 0.015,
        density: 0.002,
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5
      });

      body.customColor = cfg.color;
      body.radius = cfg.r;
      return body;
    });

    ballsRef.current = balls;
    Composite.add(engine.world, balls);

    // Collision sound listener
    Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const isBallColliding = balls.includes(pair.bodyA) || balls.includes(pair.bodyB);
        if (isBallColliding && Math.random() < 0.2) {
          sound.playBounce();
        }
      });
    });

    // Interactive Dragging and Mouse Repulsion
    let mousePos = { x: -1000, y: -1000 };
    let draggedBall = null;
    let lastDragPos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const getCanvasMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = (e) => {
      const pos = getCanvasMousePos(e);
      // Check if clicked inside any ball
      for (const ball of balls) {
        const dx = ball.position.x - pos.x;
        const dy = ball.position.y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) <= ball.radius + 12) {
          draggedBall = ball;
          lastDragPos = { ...pos };
          dragVelocity = { x: 0, y: 0 };
          Body.setStatic(draggedBall, true);
          sound.playPop(520);
          break;
        }
      }
    };

    const handleMouseMove = (e) => {
      const pos = getCanvasMousePos(e);
      mousePos = pos;

      if (draggedBall) {
        dragVelocity = {
          x: (pos.x - lastDragPos.x) * 0.8,
          y: (pos.y - lastDragPos.y) * 0.8
        };
        lastDragPos = { ...pos };
        Body.setPosition(draggedBall, pos);
      }
    };

    const handleMouseUp = () => {
      if (draggedBall) {
        Body.setStatic(draggedBall, false);
        Body.setVelocity(draggedBall, {
          x: Math.max(-15, Math.min(15, dragVelocity.x)),
          y: Math.max(-15, Math.min(15, dragVelocity.y))
        });
        sound.playPop(700);
        draggedBall = null;
      }
    };

    const handleMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
      if (draggedBall) {
        Body.setStatic(draggedBall, false);
        draggedBall = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Custom animation loop for 60fps rendering
    let animId;
    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Repulsion force for non-dragged balls
      balls.forEach((ball) => {
        if (ball === draggedBall) return;

        const dx = ball.position.x - mousePos.x;
        const dy = ball.position.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 130;

        if (dist < repelRadius && dist > 1) {
          const force = (1 - dist / repelRadius) * 0.004;
          Body.applyForce(ball, ball.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force
          });
        }

        // Keep floating in drift mode
        if (!engine.world.gravity.y) {
          const speed = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
          if (speed < 0.4) {
            Body.applyForce(ball, ball.position, {
              x: (Math.random() - 0.5) * 0.0006,
              y: (Math.random() - 0.5) * 0.0006
            });
          }
        }

        // Draw ball with clean retro styling
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.customColor;
        ctx.fill();

        // Dark outline
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = '#141516';
        ctx.stroke();

        // 3D specular highlight
        ctx.beginPath();
        ctx.arc(
          ball.position.x - ball.radius * 0.28,
          ball.position.y - ball.radius * 0.28,
          ball.radius * 0.24,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;

      Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
      Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
      Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  // Watch isPlaying prop change
  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;

    if (isPlaying) {
      engine.world.gravity.y = 1.2;
      sound.playPowerUp();
      ballsRef.current.forEach((ball) => {
        Matter.Body.applyForce(ball, ball.position, {
          x: (Math.random() - 0.5) * 0.045,
          y: -0.04 - Math.random() * 0.03
        });
      });
    } else {
      engine.world.gravity.y = 0;
      sound.playPop(300);
      ballsRef.current.forEach((ball) => {
        Matter.Body.setVelocity(ball, {
          x: (Math.random() - 0.5) * 2,
          y: -2.5 - Math.random() * 2
        });
      });
    }
  }, [isPlaying]);

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-[2]"
    />
  );
}
