"use client";

import React from 'react';

interface ChipProps {
  label: string;
}

const Chip: React.FC<ChipProps> = React.memo(({ label }) => {
  const color = label.toLowerCase() === 'male' ? 'border-blue-200' : 'border-pink-200';
  const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <span className={`items-center whitespace-nowrap rounded-lg border ${color} border-2 py-1.5 px-3 font-sans text-xs font-bold text-gray-700`}>
      {formattedLabel}
    </span>
  );
});

Chip.displayName = 'Chip';

export default Chip;
