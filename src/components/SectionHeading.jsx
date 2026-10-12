import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = ''
}) {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-6 sm:mb-8 ${alignment[align] || alignment.center} ${className}`}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200 mb-3">
          {badge}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
