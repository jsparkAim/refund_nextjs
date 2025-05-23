import React, { useState } from "react";

interface Policy {
  title: string;
  content: string;
  updatedAt: string;
}

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy?: Policy[];
}

export function PolicyModal({
  isOpen,
  onClose,
  policy = [],
}: PolicyModalProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy>(policy[0] || {});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (selected: Policy) => {
    setSelectedPolicy(selected);
    setDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-4">
      <div className="bg-white w-[325px] h-[550px] p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mt-10 sm:mt-20 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <p className="text-xl font-bold mb-4 text-center">
          {selectedPolicy.title}
        </p>

        {/* Custom Dropdown */}
        <div className="relative mb-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left p-2 border rounded bg-white">
            {selectedPolicy.updatedAt || "버전을 선택하세요"}
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow-md max-h-40 overflow-y-auto">
              {policy.map((p) => (
                <li
                  key={p.updatedAt}
                  onClick={() => handleSelect(p)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                  {p.updatedAt}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto mb-4">
          <p className="text-lg font-bold mb-2">{selectedPolicy.title}</p>
          <p>{selectedPolicy.content}</p>
        </div>
      </div>
    </div>
  );
}
