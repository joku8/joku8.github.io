import React from "react";
import { Badge, Group } from "@mantine/core";

interface BadgeItem {
  emoji?: string;
  label: string;
}

interface BadgeGroupProps {
  badges: BadgeItem[];
  spacing?: number | string;
  variant?: "light" | "filled" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const BadgeGroup: React.FC<BadgeGroupProps> = ({ 
  badges, 
  spacing = 7, 
  variant = "light",
  size = "sm"
}) => (
  <Group spacing={spacing}>
    {badges.map((badge, index) => (
      <Badge 
        variant={variant} 
        key={`${badge.label}-${index}`} 
        leftSection={badge.emoji || undefined}
        size={size}
      >
        {badge.label}
      </Badge>
    ))}
  </Group>
);