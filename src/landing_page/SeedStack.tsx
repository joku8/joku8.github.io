import React, { useEffect, useRef, useState } from "react";

interface SeedPacket {
  id: string;
  image: string;
  zIndex: number; // Original z-index
  originalPosition: { top: number; left: number };
}

interface SeedStackProps {
  setProgressActive: (isActive: boolean) => void;
  freeze: boolean; // Disable interactions if true
}

const SeedStack: React.FC<SeedStackProps> = ({ setProgressActive, freeze }) => {
  const seedHeight = 0.3 * window.innerHeight; // 30% of viewport height
  const seedWidth = seedHeight * (1 / 1.5); // Maintain aspect ratio 1:1.5
  const basePosition = {
    top: 20,
    left: window.innerWidth - 20 - seedWidth, // Top-right with padding
  };

  const lineThreshold = 0.75 * window.innerHeight; // 25% from bottom

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
        top: basePosition.top + 0.1 * window.innerHeight, // Offset by 10% of viewport height
      },
    },
    {
      id: "cucumber",
      image: "/artifacts/cucumber_seed_packet.png",
      zIndex: 2,
      originalPosition: {
        ...basePosition,
        top: basePosition.top + 0.05 * window.innerHeight, // Offset by 5% of viewport height
      },
    },
    {
      id: "tomato",
      image: "/artifacts/tomato_seed_packet.png",
      zIndex: 1,
      originalPosition: {
        ...basePosition,
        top: basePosition.top, // No offset
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
    if (freeze) return; // Disable interaction when frozen

    e.preventDefault();

    const rect = seedRefs.current[id]!.getBoundingClientRect();
    draggingRef.current = {
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    // Temporarily bring the dragged item to the front
    seeds.forEach((seed) => {
      if (seed.id === id) {
        seed.zIndex = Math.max(...seeds.map((s) => s.zIndex)) + 1;
      }
    });

    setSelectedSeed(id); // Mark this seed as selected
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (freeze) return; // Disable dragging when frozen

    const draggingId = draggingRef.current.id;
    if (!draggingId) return;

    const offsetX = draggingRef.current.offsetX;
    const offsetY = draggingRef.current.offsetY;

    const newTop = e.clientY - offsetY;
    const newLeft = e.clientX - offsetX;

    const isBelow = newTop + seedHeight > lineThreshold;

    // Update rotation and progress bar state
    const wasRotated = rotationRef.current[draggingId] === -125;
    rotationRef.current[draggingId] = isBelow ? -125 : 0;

    // If any packet is rotated, activate the progress bar
    if (isBelow && !wasRotated) setProgressActive(true);
    if (!isBelow && wasRotated) {
      const isAnyRotated = Object.values(rotationRef.current).some(
        (angle) => angle === -125
      );
      if (!isAnyRotated) setProgressActive(false); // Reset if no packets are rotated
    }

    // Update the position in real-time
    positionsRef.current[draggingId] = { top: newTop, left: newLeft };
    const seedElement = seedRefs.current[draggingId];
    if (seedElement) {
      seedElement.style.top = `${newTop}px`;
      seedElement.style.left = `${newLeft}px`;
      seedElement.style.transform = `rotate(${
        rotationRef.current[draggingId] || 0
      }deg) scale(1.15)`; // Keep enlarged while dragging
    }
  };

  const handleMouseUp = () => {
    if (freeze) {
      // Reset all seed packets to their original position
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

    // Snap back to original position
    const originalPosition = seeds.find(
      (seed) => seed.id === draggingId
    )!.originalPosition;

    const seedElement = seedRefs.current[draggingId];
    if (seedElement) {
      seedElement.style.transition =
        "top 0.3s ease, left 0.3s ease, transform 0.3s ease";
      seedElement.style.top = `${originalPosition.top}px`;
      seedElement.style.left = `${originalPosition.left}px`;
      seedElement.style.transform = "rotate(0deg) scale(1)"; // Reset size after release
    }

    positionsRef.current[draggingId] = originalPosition;
    rotationRef.current[draggingId] = 0;
    setProgressActive(false);
    setSelectedSeed(null); // Deselect the seed

    // Reset z-index to the original value
    seeds.forEach((seed) => {
      if (seed.id === draggingId) {
        seed.zIndex = originalZIndexes.current[draggingId];
      }
    });

    draggingRef.current = { id: null, offsetX: 0, offsetY: 0 };

    // Remove transition after snap-back
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
  }, []);

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
                ? seed.originalPosition.top - 0.05 * seedHeight // Hover effect: rise by 10% of height
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
              selectedSeed === seed.id ? "scale(1.15)" : "scale(1)" // Enlarge when selected
            }`,
            transition: "top 0.4s ease, transform 0.3s ease", // Slower hover rise
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
