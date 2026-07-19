import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select an option",
  className = "",
  label = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => 
    typeof opt === 'object' ? opt.value === value : opt === value
  );

  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
    : placeholder;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#0a0a0c]/80 hover:bg-[#121216] border text-white rounded-xl px-4 py-3 text-xs font-medium transition-all duration-200 shadow-sm focus:outline-none cursor-pointer ${
          isOpen ? 'border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.25)]' : 'border-white/10 hover:border-white/20'
        }`}
      >
        <span className={selectedOption ? "text-white font-medium" : "text-gray-500"}>
          {displayLabel}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="text-gray-400"
        >
          <ChevronDown size={15} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl bg-[#0b0c10]/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            {options.map((opt, idx) => {
              const optVal = typeof opt === 'object' ? opt.value : opt;
              const optLbl = typeof opt === 'object' ? opt.label : opt;
              const isSelected = optVal === value;

              return (
                <motion.button
                  key={idx}
                  type="button"
                  whileHover={{ x: 3, backgroundColor: 'rgba(255, 87, 34, 0.12)' }}
                  onClick={() => handleSelect(optVal)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all duration-150 text-left cursor-pointer mb-0.5 ${
                    isSelected
                      ? 'text-[#FF5722] font-semibold bg-[#FF5722]/10'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{optLbl}</span>
                  {isSelected && <Check size={14} className="text-[#FF5722] shrink-0" />}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
