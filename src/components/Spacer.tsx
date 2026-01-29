import React from "react";

interface SpacerProps {
  height?: string;
}

export const Spacer: React.FC<SpacerProps> = ({ height = "2rem" }) => (
  <div style={{ height }} />
);