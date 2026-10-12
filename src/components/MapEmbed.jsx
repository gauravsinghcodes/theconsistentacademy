import React from 'react';
import { FiMapPin, FiExternalLink, FiNavigation } from 'react-icons/fi';
import { ACADEMY_INFO } from '../data/academyData';

export default function MapEmbed({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col ${className}`}>
      {/* Map Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-brand-50 text-brand-700 shrink-0 mt-0.5">
            <FiMapPin className="text-lg" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200/60">
                Location & Map
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              The Consistent Academy
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {ACADEMY_INFO.contact.address}
            </p>
          </div>
        </div>

        <a
          href={ACADEMY_INFO.contact.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-700 text-white hover:bg-brand-800 transition-colors shrink-0 shadow-xs"
        >
          <FiNavigation className="text-xs" />
          <span>Get Directions</span>
          <FiExternalLink className="text-xs opacity-75" />
        </a>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-100">
        <iframe
          title="The Consistent Academy Location Map"
          src={ACADEMY_INFO.contact.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter saturate-90 contrast-95"
        />
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Offline & Online Batches Available from Pune</span>
        <span className="text-brand-700 font-medium">Maharashtra, India</span>
      </div>
    </div>
  );
}
