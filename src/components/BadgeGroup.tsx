import React from "react";
import { Badge, Group } from "@mantine/core";
import { parseSkillString } from "../data/skills";

interface BadgeItem {
  emoji?: string;
  label: string;
}

interface BadgeGroupProps {
  badges: BadgeItem[] | string[];
  spacing?: number | string;
  variant?: "light" | "filled" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const BadgeGroup: React.FC<BadgeGroupProps> = ({ 
  badges, 
  spacing = 7, 
  variant = "light",
  size = "sm"
}) => {
  const normalizedBadges: BadgeItem[] = badges.map((badge) => {
    if (typeof badge === 'string') {
      return parseSkillString(badge);
    }
    return badge;
  });

  return (
    <Group spacing={spacing}>
      {normalizedBadges.map((badge, index) => (
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
};