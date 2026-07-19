import React from 'react';
import { motion } from 'framer-motion';

export default function CustomRadio({ 
  id, 
  name, 
  value, 
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
      className={`relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${
        checked 
          ? 'bg-[#FF5722]/10 border-[#FF5722]/60 shadow-[0_0_15px_rgba(255,87,34,0.15)] text-white' 
          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-gray-300'
      } ${className}`}
    >
      <input 
        type="radio" 
        id={id} 
        name={name} 
        value={value} 
        checked={checked} 
        disabled={disabled}
        onChange={onChange} 
        className="sr-only" 
      />
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <div 
          className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center ${
            checked 
              ? 'border-[#FF5722] bg-[#FF5722]/20' 
              : 'border-white/20 bg-white/[0.03]'
          }`}
        >
          {checked && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="w-2 h-2 rounded-full bg-[#FF5722] shadow-[0_0_8px_#FF5722]"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col text-xs">
        <span className={`font-semibold tracking-wide ${checked ? 'text-white' : 'text-gray-200'}`}>
          {label}
        </span>
        {sublabel && (
          <span className="text-[11px] text-gray-400 font-light mt-0.5 leading-relaxed">
            {sublabel}
          </span>
        )}
      </div>
    </label>
  );
}
