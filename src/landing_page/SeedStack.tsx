import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface SeedPacket {
  id: string;
  image: string;
  zIndex: number;
  originalPosition: { top: number; left: number };
}

interface SeedStackProps {
  setProgressActive: (isActive: boolean) => void;
  freeze: boolean;
  vpHeight: number;
  vpWidth: number;
}

const SeedStack: React.FC<SeedStackProps> = ({ setProgressActive, freeze, vpHeight, vpWidth }) => {
  const seedHeight = 0.3 * vpHeight;
  const seedWidth = seedHeight * (1 / 1.5);
  const basePosition = useMemo(() => ({
    top: 20,
    left: vpWidth - 20 - seedWidth,
  }), [vpWidth, seedWidth]);
  
  const lineThreshold = 0.75 * vpHeight;

  const seedRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const rotationRef = useRef<{ [key: string]: number }>({});
  const animationFrameRef = useRef<number>();

  const [hoveredSeed, setHoveredSeed] = useState<string | null>(null);
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null);
  const [zIndexes, setZIndexes] = useState<{ [key: string]: number }>({});

  const seeds = useMemo<SeedPacket[]>(() => [
    {
      id: "carrot",
      image: "/artifacts/carrot_seed_packet.png",
      zIndex: 103,
      originalPosition: {
        ...basePosition,
        top: basePosition.top + 0.1 * vpHeight,
      },
    },
    {
      id: "cucumber",
      image: "/artifacts/cucumber_seed_packet.png",
      zIndex: 102,
      originalPosition: {
        ...basePosition,
        top: basePosition.top + 0.05 * vpHeight,
      },
    },
    {
      id: "tomato",
      image: "/artifacts/tomato_seed_packet.png",
      zIndex: 101,
      originalPosition: {
        ...basePosition,
        top: basePosition.top,
      },
    },
  ], [basePosition, vpHeight]);

  const draggingRef = useRef<{
    id: string | null;
    offsetX: number;
    offsetY: number;
    mouseX: number;
    mouseY: number;
  }>({ id: null, offsetX: 0, offsetY: 0, mouseX: 0, mouseY: 0 });

  const originalZIndexes = useRef<{ [key: string]: number }>(
    seeds.reduce((acc, seed) => {
      acc[seed.id] = seed.zIndex;
      return acc;
    }, {} as { [key: string]: number })
  );

  useEffect(() => {
    setZIndexes(originalZIndexes.current);
  }, []);

  const updateSeedTransform = useCallback((id: string, top: number, left: number, rotation: number, scale: number) => {
    const seedElement = seedRefs.current[id];
    if (seedElement) {
      seedElement.style.transform = `translate(${left}px, ${top}px) rotate(${rotation}deg) scale(${scale})`;
    }
  }, []);

  const animate = useCallback(() => {
    if (freeze) return;

    const draggingId = draggingRef.current.id;
    if (!draggingId) return;

    const { mouseX, mouseY, offsetX, offsetY } = draggingRef.current;
    const newTop = mouseY - offsetY;
    const newLeft = mouseX - offsetX;

    const distanceFromGround = lineThreshold - (newTop + seedHeight);
    const currentRotation = rotationRef.current[draggingId] || 0;
    
    let targetRotation = 0;
    if (distanceFromGround < 0) {
      targetRotation = -125;
    } else if (distanceFromGround < seedHeight * 0.5) {
      const proximityRatio = distanceFromGround / (seedHeight * 0.5);
      const easedRatio = 1 - Math.pow(proximityRatio, 2);
      targetRotation = -125 * easedRatio;
    }

    const rotationSpeed = distanceFromGround < 0 ? 0.4 : 0.2;
    const newRotation = currentRotation + (targetRotation - currentRotation) * rotationSpeed;
    
    const wasRotated = currentRotation <= -120;
    const isFullyRotated = newRotation <= -120;
    
    rotationRef.current[draggingId] = newRotation;

    if (isFullyRotated !== wasRotated) {
      setProgressActive(isFullyRotated);
    }

    updateSeedTransform(draggingId, newTop, newLeft, newRotation, 1.15);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [freeze, lineThreshold, seedHeight, setProgressActive, updateSeedTransform]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (freeze) return;
    e.preventDefault();

    const rect = seedRefs.current[id]!.getBoundingClientRect();
    const seed = seeds.find(s => s.id === id)!;
    
    draggingRef.current = {
      id,
      offsetX: e.clientX - seed.originalPosition.left,
      offsetY: e.clientY - seed.originalPosition.top,
      mouseX: e.clientX,
      mouseY: e.clientY,
    };

    setZIndexes(prev => ({
      ...prev,
      [id]: Math.max(...Object.values(prev)) + 1
    }));
    setSelectedSeed(id);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [freeze, seeds, animate]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingRef.current.id) {
      draggingRef.current.mouseX = e.clientX;
      draggingRef.current.mouseY = e.clientY;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    const draggingId = draggingRef.current.id;
    if (!draggingId) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const originalPosition = seeds.find(seed => seed.id === draggingId)!.originalPosition;
    const seedElement = seedRefs.current[draggingId];
    
    if (seedElement) {
      seedElement.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
      updateSeedTransform(draggingId, originalPosition.top, originalPosition.left, 0, 1);
      
      setTimeout(() => {
        if (seedElement) seedElement.style.transition = "";
      }, 300);
    }

    rotationRef.current[draggingId] = 0;
    setProgressActive(false);
    setSelectedSeed(null);
    setZIndexes(prev => ({
      ...prev,
      [draggingId]: originalZIndexes.current[draggingId]
    }));

    draggingRef.current = { id: null, offsetX: 0, offsetY: 0, mouseX: 0, mouseY: 0 };
  }, [seeds, setProgressActive, updateSeedTransform]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <>
      {seeds.map((seed) => (
        <div
          key={seed.id}
          ref={(el) => (seedRefs.current[seed.id] = el)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: zIndexes[seed.id] || seed.zIndex,
            height: seedHeight,
            width: seedWidth,
            backgroundImage: `url(${seed.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `translate(${seed.originalPosition.left}px, ${
              hoveredSeed === seed.id && !selectedSeed
                ? seed.originalPosition.top - 0.05 * seedHeight
                : seed.originalPosition.top
            }px) scale(${selectedSeed === seed.id ? 1.15 : 1})`,
            transition: selectedSeed === seed.id ? "none" : "transform 0.2s ease-out",
            cursor: freeze ? "default" : "grab",
            willChange: "transform",
          }}
          onMouseDown={(e) => handleMouseDown(e, seed.id)}
          onMouseEnter={() => !freeze && setHoveredSeed(seed.id)}
          onMouseLeave={() => setHoveredSeed(null)}
        />
      ))}
    </>
  );
};

export default SeedStack;
