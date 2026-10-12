import React, { useState, useEffect } from 'react';
import { 
  FiClock, 
  FiTag, 
  FiArrowRight, 
  FiCheckCircle, 
  FiLayers, 
  FiX 
} from 'react-icons/fi';
import Button from './Button';

export default function CourseCard({ course, isKid = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const hasModules = course.modules && course.modules.length > 0;
  const hasFeatures = course.features && course.features.length > 0;

  return (
    <>
      <article className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden group">
        {/* Image container */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/logo2.png';
              e.target.className = 'w-full h-full object-contain p-8 bg-slate-50 opacity-60';
            }}
          />
          {course.category && (
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60">
              {course.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            {/* Meta tags */}
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-2">
              {course.duration && (
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <FiClock className="text-brand-700 text-sm" />
                  {course.duration}
                </span>
              )}
              {course.price && (
                <span className="inline-flex items-center gap-1.5 text-brand-800 font-semibold bg-brand-50 px-2 py-0.5 rounded">
                  <FiTag className="text-brand-700 text-xs" />
                  {course.price}
                </span>
              )}
            </div>

            {/* Course Title */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors line-clamp-2 min-h-[3rem]">
              {course.title}
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-brand-700 font-medium mt-1 line-clamp-1 min-h-[1rem]">
              {course.subtitle || (isKid ? 'Youth Literacy & Confidence' : 'Professional Skill Development')}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
              {course.description}
            </p>
          </div>

          {/* Action Row & Popup Trigger */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2.5">
            {/* Pop-up Curriculum / Features Trigger Button */}
            {hasModules ? (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-between text-xs font-semibold px-3 py-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 hover:text-brand-800 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <FiLayers className="text-brand-700 text-sm" />
                  <span>Curriculum ({course.modules.length} Modules)</span>
                </span>
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded">
                  View Syllabus &rarr;
                </span>
              </button>
            ) : hasFeatures ? (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-between text-xs font-semibold px-3 py-2 rounded-lg bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 hover:text-brand-800 transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <FiCheckCircle className="text-brand-700 text-sm" />
                  <span>Key Outcomes ({course.features.length})</span>
                </span>
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded">
                  View Details &rarr;
                </span>
              </button>
            ) : null}

            {/* Inquire CTA */}
            <Button
              to={`/contact?course=${encodeURIComponent(course.title)}`}
              variant="primary"
              size="sm"
              className="w-full"
              icon={FiArrowRight}
              iconPosition="right"
            >
              Inquire for Batch
            </Button>
          </div>
        </div>
      </article>

      {/* POPUP MODAL DIALOG */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
              <div>
                {course.category && (
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-700 mb-1">
                    {course.category}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {course.title}
                </h3>
                {course.subtitle && (
                  <p className="text-xs text-brand-800 font-medium mt-0.5">
                    {course.subtitle}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-2.5">
                  {course.duration && (
                    <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <FiClock className="text-brand-700" />
                      {course.duration}
                    </span>
                  )}
                  {course.price && (
                    <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-900 px-2 py-0.5 rounded border border-brand-200 font-semibold">
                      <FiTag className="text-brand-700" />
                      {course.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                aria-label="Close syllabus popup"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 custom-scrollbar flex-grow bg-white">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Syllabus Modules */}
              {hasModules && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Course Curriculum Breakdown:
                  </h4>
                  <div className="space-y-2.5">
                    {course.modules.map((mod, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                        <div className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-900 mb-2">
                          <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-1.5"></span>
                          <span>{mod.title}</span>
                        </div>
                        {mod.topics && (
                          <div className="flex flex-wrap gap-1.5 pl-4">
                            {mod.topics.map((t, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs font-normal"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features for Kids */}
              {hasFeatures && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Key Learning Outcomes:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    {course.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <FiCheckCircle className="text-brand-600 text-sm shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Close
              </button>

              <Button
                to={`/contact?course=${encodeURIComponent(course.title)}`}
                variant="primary"
                size="sm"
                icon={FiArrowRight}
                iconPosition="right"
                onClick={() => setIsModalOpen(false)}
              >
                Inquire for This Course
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
