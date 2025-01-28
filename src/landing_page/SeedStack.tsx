import React, { useEffect, useRef } from "react";

interface SeedPacket {
  id: string;
  image: string;
  zIndex: number; // Original z-index
  originalPosition: { top: number; left: number };
}

interface SeedStackProps {
  setProgressActive: (isActive: boolean) => void; // Function to toggle progress bar state
}

const SeedStack: React.FC<SeedStackProps> = ({ setProgressActive }) => {
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

  const [seeds] = React.useState<SeedPacket[]>([
    {
      id: "carrot",
      image: "/artifacts/carrot_seed_packet.png",
      zIndex: 3,
      originalPosition: { ...basePosition, top: basePosition.top + 70 },
    },
    {
      id: "cucumber",
      image: "/artifacts/cucumber_seed_packet.png",
      zIndex: 2,
      originalPosition: { ...basePosition, top: basePosition.top + 35 },
    },
    {
      id: "tomato",
      image: "/artifacts/tomato_seed_packet.png",
      zIndex: 1,
      originalPosition: { ...basePosition },
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
  };

  const handleMouseMove = (e: MouseEvent) => {
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
      }deg)`;
    }
  };

  const handleMouseUp = () => {
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
      seedElement.style.transform = "rotate(0deg)";
    }

    positionsRef.current[draggingId] = originalPosition;
    rotationRef.current[draggingId] = 0;
    setProgressActive(false);

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
            top: seed.originalPosition.top,
            left: seed.originalPosition.left,
            zIndex: seed.zIndex,
            height: seedHeight,
            width: seedWidth,
            backgroundImage: `url(${seed.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `rotate(${rotationRef.current[seed.id] || 0}deg)`,
            cursor: "grab",
          }}
          onMouseDown={(e) => handleMouseDown(e, seed.id)}
        ></div>
      ))}
    </>
  );
};

export default SeedStack;
