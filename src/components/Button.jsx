import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-700 hover:bg-brand-800 text-white shadow-sm hover:shadow focus-visible:ring-brand-700',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm focus-visible:ring-slate-400',
    outline: 'border border-brand-700 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-700',
    ghost: 'text-slate-700 hover:text-brand-700 hover:bg-brand-50/50',
    accent: 'bg-brand-100 hover:bg-brand-200 text-brand-900 focus-visible:ring-brand-600',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="text-current text-base shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="text-current text-base shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
