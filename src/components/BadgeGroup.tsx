import React from "react";
import { Badge, Group } from "@mantine/core";

interface BadgeItem {
  emoji: string;
  label: string;
}

interface BadgeGroupProps {
  badges: BadgeItem[];
  spacing?: number;
  variant?: "light" | "filled" | "outline";
}

export const BadgeGroup: React.FC<BadgeGroupProps> = ({ 
  badges, 
  spacing = 7, 
  variant = "light" 
}) => (
  <Group spacing={spacing}>
    {badges.map((badge) => (
      <Badge variant={variant} key={badge.label} leftSection={badge.emoji}>
        {badge.label}
      </Badge>
    ))}
  </Group>
);