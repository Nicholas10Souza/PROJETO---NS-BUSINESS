import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'glass-card rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
          hoverEffect && 'hover:border-indigo-500/40 hover:shadow-glow hover:-translate-y-0.5',
          glow && 'shadow-glow border-indigo-500/30',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, icon: Icon, className = '' }) => {
  return (
    <div className={twMerge('flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5', className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          {title && <h3 className="text-base font-bold text-slate-100 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
