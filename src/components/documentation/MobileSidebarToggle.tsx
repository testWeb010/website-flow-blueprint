
import React from 'react';

interface MobileSidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileSidebarToggle: React.FC<MobileSidebarToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="lg:hidden">
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
      >
        ☰
      </button>
    </div>
  );
};

export default MobileSidebarToggle;
