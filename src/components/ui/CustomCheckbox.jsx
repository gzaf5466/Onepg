import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function CustomCheckbox({ 
  id, 
  name, 
  checked, 
  onChange, 
  label, 
  sublabel = '',
  disabled = false,
  className = "" 
}) {
  return (
    <label 
      htmlFor={id} 
      className={`relative flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${
        checked 
          ? 'bg-[#FF5722]/10 border-[#FF5722]/50 shadow-[0_0_12px_rgba(255,87,34,0.15)] text-white' 
          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-gray-300'
      } ${className}`}
    >
      <input 
        type="checkbox" 
        id={id} 
        name={name} 
        checked={checked} 
        disabled={disabled}
        onChange={onChange} 
        className="sr-only" 
      />
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <div 
          className={`w-4 h-4 rounded-md border transition-all duration-200 flex items-center justify-center ${
            checked 
              ? 'border-[#FF5722] bg-[#FF5722]' 
              : 'border-white/20 bg-white/[0.03]'
          }`}
        >
          {checked && (
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
            >
              <Check size={12} className="text-white stroke-[3]" />
            </motion.div>
          )}
        </div>
      </div>
      {(label || sublabel) && (
        <div className="flex flex-col text-xs">
          {label && (
            <span className={`font-medium tracking-wide ${checked ? 'text-white' : 'text-gray-300'}`}>
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[11px] text-gray-400 font-light mt-0.5 leading-relaxed">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
