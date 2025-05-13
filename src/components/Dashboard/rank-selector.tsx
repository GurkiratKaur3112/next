import React from 'react';

interface Rank {
  range: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const rankRanges: Rank[] = [
  { range: "1200-1300", color: "text-green-400", bgColor: "bg-green-400", borderColor: "border-green-400" },
  { range: "1300-1400", color: "text-amber-400", bgColor: "bg-amber-400", borderColor: "border-amber-400" },
  { range: "1400-1500", color: "text-red-400", bgColor: "bg-red-400", borderColor: "border-red-400" },
  { range: "1500-1600", color: "text-blue-400", bgColor: "bg-blue-400", borderColor: "border-blue-400" },
  { range: "1600-1700", color: "text-purple-400", bgColor: "bg-purple-400", borderColor: "border-purple-400" },
  { range: "1700-1800", color: "text-pink-400", bgColor: "bg-pink-400", borderColor: "border-pink-400" },
  { range: "1800-1900", color: "text-indigo-400", bgColor: "bg-indigo-400", borderColor: "border-indigo-400" },
];

interface RankSelectorProps {
  selectedRank: string | null;
  onRankChange: (rank: string) => void;
}

const RankSelector: React.FC<RankSelectorProps> = ({ selectedRank, onRankChange }) => {
  return (
    <div className="flex space-x-2">
      {rankRanges.map((rank) => (
        <button
          key={rank.range}
          className={`px-4 py-2 rounded ${selectedRank === rank.range ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => onRankChange(rank.range)}
        >
          {rank.range}
        </button>
      ))}
    </div>
  );
};

export default RankSelector;
