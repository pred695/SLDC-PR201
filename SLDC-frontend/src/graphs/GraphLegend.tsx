import React from 'react';

interface GraphLegendProps {
  text: string;
  unit?: string;
  value: number;
  color: string;
  setHovered?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GraphLegend({
  text,
  unit = '',
  value,
  color,
  setHovered = () => {},
  disabled = false,
  setDisabled = () => {},
}: GraphLegendProps) {
  return (
    <div
      className={`flex flex-col items-center w-[8rem] cursor-pointer hover:border-b-2 hover:border-current  opacity-${disabled ? 50 : 100}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setDisabled(!disabled)}
    >
      <div className={'flex gap-1 items-center'}>
        <div
          className={'rounded-full h-2 w-2'}
          style={{ backgroundColor: color }}
        />
        <span className="text-xs">{text}</span>
      </div>
      <div>{value == undefined ? '-' : `${value} ${unit}`}</div>
    </div>
  );
}
