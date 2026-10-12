import React, { useState } from 'react';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import CourseCard from '../components/CourseCard';
import Button from '../components/Button';
import { ADULT_COURSES, KIDS_COURSES } from '../data/academyData';

export default function Courses() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', name: 'All Programmes' },
    { id: 'adults', name: `Adults & Professionals (${ADULT_COURSES.length})` },
    { id: 'kids', name: `Kids & Youth (${KIDS_COURSES.length})` },
    { id: 'exam', name: 'Exam Prep (IELTS/TOEFL)' },
    { id: 'corporate', name: 'Corporate & Executive' }
  ];

  const getFilteredCourses = () => {
    let list = [];
    if (filter === 'all') {
      list = [...ADULT_COURSES, ...KIDS_COURSES.map(k => ({ ...k, isKid: true }))];
    } else if (filter === 'adults') {
      list = [...ADULT_COURSES];
    } else if (filter === 'kids') {
      list = KIDS_COURSES.map(k => ({ ...k, isKid: true }));
    } else if (filter === 'exam') {
      list = ADULT_COURSES.filter(c => c.category === 'Exam Preparation');
    } else if (filter === 'corporate') {
      list = ADULT_COURSES.filter(c => c.category.includes('Corporate') || c.category.includes('Leadership') || c.category.includes('Career'));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const displayedCourses = getFilteredCourses();

  return (
    <>
      <SEO
        title="Courses & Programmes"
        description="Explore verified course offerings at The Consistent Academy. IELTS, PTE, Corporate Communication, and Youth Literacy programmes."
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200 mb-3">
              Curriculum Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              All Courses & Learning Programmes
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Structured modules, clear outcomes, transparent fees, and proven syllabi led by British Council Certified Master Trainer Vidya Wankhade.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="py-5 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    filter === tab.id
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiSearch />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-10 sm:py-14 bg-slate-50 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedCourses.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-md mx-auto">
              <FiBookOpen className="text-3xl text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No matching programmes found
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Try clearing your search terms or choosing a different filter.
              </p>
              <button
                type="button"
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                className="text-xs font-semibold text-brand-700 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isKid={course.isKid || false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Need guidance choosing between modules?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Book an initial diagnostic conversation. We assess your starting level, discuss upcoming deadlines, and customize a learning plan.
          </p>
          <div className="pt-2">
            <Button
              to="/contact"
              variant="primary"
              size="md"
              icon={FiArrowRight}
              iconPosition="right"
            >
              Get In Touch with The Academy
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
