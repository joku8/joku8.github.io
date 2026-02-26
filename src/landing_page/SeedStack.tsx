import React, { useEffect, useRef, useState } from "react";

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
  const basePosition = {
    top: 20,
    left: vpWidth - 20 - seedWidth,
  };
  
  const lineThreshold = 0.75 * vpHeight;

  const seedRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const rotationRef = useRef<{ [key: string]: number }>({});
  const positionsRef = useRef<{ [key: string]: { top: number; left: number } }>(
    {}
  );

  const [hoveredSeed, setHoveredSeed] = useState<string | null>(null);
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null);

  const [seeds] = React.useState<SeedPacket[]>([
    {
      id: "carrot",
      image: "/artifacts/carrot_seed_packet.png",
      zIndex: 3,
      originalPosition: {
        ...basePosition,
        top: basePosition.top + 0.1 * vpHeight,
      },
    },
    {
      id: "cucumber",
      image: "/artifacts/cucumber_seed_packet.png",
      zIndex: 2,
      originalPosition: {
        ...basePosition,
        top: basePosition.top + 0.05 * vpHeight,
      },
    },
    {
      id: "tomato",
      image: "/artifacts/tomato_seed_packet.png",
      zIndex: 1,
      originalPosition: {
        ...basePosition,
        top: basePosition.top,
      },
    },
  ]);

  const draggingRef = useRef<{
    id: string | null;
    offsetX: number;
    offsetY: number;
  }>({ id: null, offsetX: 0, offsetY: 0 });

  const originalZIndexes = useRef<{ [key: string]: number }>(
    seeds.reduce((acc, seed) => {
      acc[seed.id] = seed.zIndex;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (freeze) return;

    e.preventDefault();

    const rect = seedRefs.current[id]!.getBoundingClientRect();
    draggingRef.current = {
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    seeds.forEach((seed) => {
      if (seed.id === id) {
        seed.zIndex = Math.max(...seeds.map((s) => s.zIndex)) + 1;
      }
    });

    setSelectedSeed(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (freeze) return;

    const draggingId = draggingRef.current.id;
    if (!draggingId) return;

    const offsetX = draggingRef.current.offsetX;
    const offsetY = draggingRef.current.offsetY;

    const newTop = e.clientY - offsetY;
    const newLeft = e.clientX - offsetX;

    const isBelow = newTop + seedHeight > lineThreshold;

    const distanceFromGround = lineThreshold - (newTop + seedHeight);
    
    let targetRotation = 0;
    if (isBelow) {
      targetRotation = -125;
    } else if (distanceFromGround < seedHeight * 0.5) {
      const proximityRatio = Math.max(0, distanceFromGround / (seedHeight * 0.5));
      const easedRatio = 1 - Math.pow(proximityRatio, 2);
      targetRotation = -125 * easedRatio;
    }

    const currentRotation = rotationRef.current[draggingId] || 0;
    const rotationSpeed = isBelow ? 0.3 : 0.15;
    const newRotation = currentRotation + (targetRotation - currentRotation) * rotationSpeed;
    
    const wasRotated = rotationRef.current[draggingId] <= -120;
    rotationRef.current[draggingId] = newRotation;

    const isFullyRotated = newRotation <= -120;
    if (isFullyRotated && !wasRotated) setProgressActive(true);
    if (!isFullyRotated && wasRotated) {
      const isAnyRotated = Object.values(rotationRef.current).some(
        (angle) => angle <= -120
      );
      if (!isAnyRotated) setProgressActive(false);
    }

    positionsRef.current[draggingId] = { top: newTop, left: newLeft };
    const seedElement = seedRefs.current[draggingId];
    if (seedElement) {
      seedElement.style.top = `${newTop}px`;
      seedElement.style.left = `${newLeft}px`;
      seedElement.style.transform = `rotate(${newRotation}deg) scale(1.15)`;
    }
  };

  const handleMouseUp = () => {
    if (freeze) {
      Object.keys(seedRefs.current).forEach((id) => {
        const seed = seedRefs.current[id];
        const originalPosition = seeds.find(
          (s) => s.id === id
        )!.originalPosition;

        if (seed) {
          seed.style.top = `${originalPosition.top}px`;
          seed.style.left = `${originalPosition.left}px`;
          seed.style.transform = "rotate(0deg)";
        }
      });
      return;
    }
    const draggingId = draggingRef.current.id;
    if (!draggingId) return;

    const originalPosition = seeds.find(
      (seed) => seed.id === draggingId
    )!.originalPosition;

    const seedElement = seedRefs.current[draggingId];
    if (seedElement) {
      seedElement.style.transition =
        "top 0.3s ease, left 0.3s ease, transform 0.3s ease";
      seedElement.style.top = `${originalPosition.top}px`;
      seedElement.style.left = `${originalPosition.left}px`;
      seedElement.style.transform = "rotate(0deg) scale(1)";
    }

    positionsRef.current[draggingId] = originalPosition;
    rotationRef.current[draggingId] = 0;
    setProgressActive(false);
    setSelectedSeed(null);

    seeds.forEach((seed) => {
      if (seed.id === draggingId) {
        seed.zIndex = originalZIndexes.current[draggingId];
      }
    });

    draggingRef.current = { id: null, offsetX: 0, offsetY: 0 };

    setTimeout(() => {
      if (seedElement) seedElement.style.transition = "";
    }, 300);
  };

  const handleMouseEnter = (id: string) => {
    if (freeze) return;
    setHoveredSeed(id);
  };

  const handleMouseLeave = (id: string) => {
    setHoveredSeed((current) => (current === id ? null : current));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [freeze, lineThreshold, seedHeight]);

  return (
    <>
      {seeds.map((seed) => (
        <div
          key={seed.id}
          ref={(el) => (seedRefs.current[seed.id] = el)}
          style={{
            position: "absolute",
            top:
              hoveredSeed === seed.id && !selectedSeed
                ? seed.originalPosition.top - 0.05 * seedHeight
                : seed.originalPosition.top,
            left: seed.originalPosition.left,
            zIndex: seed.zIndex,
            height: seedHeight,
            width: seedWidth,
            backgroundImage: `url(${seed.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `rotate(${rotationRef.current[seed.id] || 0}deg) ${
              selectedSeed === seed.id ? "scale(1.15)" : "scale(1)"
            }`,
            transition: "top 0.4s ease, transform 0.3s ease",
            cursor: "grab",
          }}
          onMouseDown={(e) => handleMouseDown(e, seed.id)}
          onMouseEnter={() => handleMouseEnter(seed.id)}
          onMouseLeave={() => handleMouseLeave(seed.id)}
        ></div>
      ))}
    </>
  );
};

export default SeedStack;
