import React from 'react';
import { FiHome } from 'react-icons/fi';
import SEO from '../components/SEO';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are trying to visit might have been moved, renamed, or is temporarily unavailable. Let's get you back on track.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="primary" size="md" icon={FiHome}>
              Back to Home
            </Button>
            <Button to="/courses" variant="secondary" size="md">
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
