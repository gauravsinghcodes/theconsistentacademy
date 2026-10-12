import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiStar, 
  FiChevronDown, 
  FiChevronLeft, 
  FiChevronRight, 
  FiExternalLink,
  FiCalendar
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import CourseCard from '../components/CourseCard';
import Button from '../components/Button';
import { 
  ACADEMY_INFO, 
  FOUNDER_INFO, 
  BOOKS_DATA, 
  ADULT_COURSES, 
  KIDS_COURSES, 
  TESTIMONIALS, 
  FAQS, 
  BLOG_POSTS, 
  LEARNING_IN_ACTION_IMAGES
} from '../data/academyData';

export default function Home() {
  const [activeTab, setActiveTab] = useState('adults');
  const [openFaq, setOpenFaq] = useState(null);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [galleryHovered, setGalleryHovered] = useState(false);

  // Group photos into sets of 4 for a single row display
  const photoChunks = [];
  const chunkSize = 4;
  for (let i = 0; i < LEARNING_IN_ACTION_IMAGES.length; i += chunkSize) {
    let chunk = LEARNING_IN_ACTION_IMAGES.slice(i, i + chunkSize);
    if (chunk.length < chunkSize) {
      chunk = [...chunk, ...LEARNING_IN_ACTION_IMAGES.slice(0, chunkSize - chunk.length)];
    }
    photoChunks.push(chunk);
  }

  // Auto-slide to the next 4 photos every 4 seconds, pause on hover
  useEffect(() => {
    if (galleryHovered || photoChunks.length === 0) return;
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % photoChunks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryHovered, photoChunks.length]);

  const handlePrevSlide = () => {
    setGallerySlide((prev) => (prev === 0 ? photoChunks.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setGallerySlide((prev) => (prev + 1) % photoChunks.length);
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEO
        title="Home"
        description="Master IELTS, corporate communication, and spoken English with British Council certified trainer Vidya Wankhade at The Consistent Academy in Pune."
      />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200/80 min-h-[calc(100vh-4.5rem)] sm:min-h-[calc(100vh-5rem)] flex items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Right-Side Image Container for v20.jpeg with responsive scaling and lady focus */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-1/2 z-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/gallery/v20.jpeg"
              alt="Founder Vidya Wankhade"
              className="w-full h-full object-cover object-[72%_28%] scale-[1.25] sm:scale-[1.5] md:scale-[1.85] lg:scale-[1.95] origin-[72%_28%] filter blur-[0.5px] opacity-90 sm:opacity-95 md:opacity-100 contrast-[1.05] brightness-[1.02]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/gallery/v20.jpeg';
              }}
            />
            {/* Subtle edge fades only on left and edges to prevent haze while keeping lady crisp */}
            <div className="absolute inset-y-0 left-0 w-1/2 md:w-1/3 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50/20 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-slate-50/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50/70 to-transparent" />
            
            {/* Mobile/Tablet readability backdrop tint (< md screens) - soft gradient so lady is clearly visible with gentle blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-slate-50/45 to-slate-50/20 sm:bg-slate-50/50 md:hidden pointer-events-none" />
          </div>
        </div>

        {/* Ambient background glow accents */}
        <div className="absolute -top-24 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-brand-50/50 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content - Responsively constrained layout for phones, tablets, and large screens */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-xl md:max-w-md lg:max-w-2xl xl:max-w-3xl text-left space-y-5 sm:space-y-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
              Master English with <span className="text-brand-700">structured consistency</span>, not temporary shortcuts.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl lg:max-w-2xl leading-relaxed font-normal">
              Practical, small-cohort training for high-stakes IELTS examination prep, corporate fluency, and youth literacy.
            </p>

            {/* Action Buttons styled for light background and responsive wrapping */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2 sm:pt-3 max-w-sm sm:max-w-none">
              <Button
                to="/courses"
                variant="primary"
                icon={FiArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto text-xs sm:text-base py-2.5 sm:py-3.5 px-5 sm:px-6 shadow-sm hover:shadow text-center justify-center font-semibold"
              >
                Explore Programmes
              </Button>

              <Button
                href={ACADEMY_INFO.contact.socials.whatsapp}
                variant="ghost"
                icon={FaWhatsapp}
                className="w-full sm:w-auto text-xs sm:text-base py-2.5 sm:py-3.5 px-5 sm:px-6 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border border-emerald-600/20 text-center justify-center font-semibold"
              >
                WhatsApp Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Merged About & Meet the Founder Section */}
      <section id="about" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
        <div id="founder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="About The Academy"
            title="Meet the Founder — Vidya Wankhade"
            subtitle="Built on consistency, proven pedagogy, and individualized mentorship to construct authentic fluency and high test scores."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block">
                Pedagogical Expertise & Background
              </span>
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {FOUNDER_INFO.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Verified Credentials Pills */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                  Verified Trainer Credentials
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {FOUNDER_INFO.qualifications.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                      <FiCheckCircle className="text-brand-700 text-sm shrink-0 mt-0.5" />
                      <span className="font-medium">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Founder Portrait & Philosophy Quote */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs">
              <div className="aspect-square max-w-[240px] mx-auto rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-slate-200 shadow-inner">
                <img
                  src={FOUNDER_INFO.image}
                  alt={FOUNDER_INFO.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/logo2.png';
                  }}
                />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900">
                  {FOUNDER_INFO.name}
                </h3>
                <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mt-0.5">
                  {FOUNDER_INFO.role}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {FOUNDER_INFO.experience}
                </p>

                <div className="mt-4 p-4 bg-brand-50/60 rounded-xl border border-brand-100 text-xs text-slate-700 italic text-left relative">
                  <span className="text-2xl text-brand-400 font-serif absolute -top-1 left-2 leading-none">“</span>
                  <p className="pl-3">{FOUNDER_INFO.quote}”</p>
                  <p className="text-[11px] font-bold text-brand-800 mt-2 text-right not-italic">— Vidya Wankhade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Journey of Excellence Timeline (Full Width Across Grid) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div className="max-w-2xl mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 block mb-1">
                19-Year Career Evolution
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Chronological Journey of Pedagogy
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Milestones in building high-impact English and exam prep training methodology.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 relative">
              {FOUNDER_INFO.journey.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-brand-100 text-brand-800 mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-1">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Programmes Catalog */}
      <section id="courses" className="py-10 sm:py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Verified Curriculum"
            title="Authentic Learning Programmes"
            subtitle="Designed around concrete competencies: exam band criteria, corporate workplace performance, and youthful elocution."
          />

          {/* Toggle Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex flex-wrap sm:flex-nowrap justify-center p-1 bg-slate-200/80 rounded-xl border border-slate-300/60 max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('adults')}
                className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'adults'
                    ? 'bg-white text-brand-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Adults & Professionals ({ADULT_COURSES.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('kids')}
                className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'kids'
                    ? 'bg-white text-brand-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kids & Young Learners ({KIDS_COURSES.length})
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeTab === 'adults' ? (
              ADULT_COURSES.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              KIDS_COURSES.map((course) => (
                <CourseCard key={course.id} course={course} isKid={true} />
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Button
              to="/courses"
              variant="outline"
              size="md"
              icon={FiArrowRight}
              iconPosition="right"
            >
              View Full Course Catalog & Syllabi
            </Button>
          </div>
        </div>
      </section>


      {/* 5. Published Books Spotlight */}
      <section className="py-10 sm:py-14 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Author & Literature"
            title="Books Authored by Vidya Wankhade"
            subtitle="Original teaching methodology published and distributed globally across Amazon, Flipkart, and Evincepub."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BOOKS_DATA.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="py-4 px-3 bg-slate-100/70 flex items-center justify-center h-72 sm:h-80 border-b border-slate-100 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-auto max-h-[260px] sm:max-h-[290px] object-contain drop-shadow-xl rounded transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/logo2.png';
                      e.target.className = 'max-h-24 w-auto object-contain opacity-50';
                    }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-brand-700">Published {book.year}</span>
                    <span>Evincepub Publishing</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-brand-800 font-medium mb-3">
                    {book.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 flex-grow">
                    {book.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Available On:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {book.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                        >
                          <span>{link.name}</span>
                          <FiExternalLink className="text-[10px] opacity-70" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Learning in Action (4 Photos Per Row Auto-Rotating Showcase) */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200/80 mb-2">
                Moments & Workshops
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Learning in Action
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl">
                Authentic classroom workshops, high-stakes mock assessments, group discussions, and interactive student seminars.
              </p>
            </div>

            {/* Slider Controls (Arrows & Counter) */}
            <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
              <span className="text-xs font-semibold text-slate-500 mr-2 hidden sm:inline">
                Set {gallerySlide + 1} of {photoChunks.length}
              </span>
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous 4 photos"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 border border-slate-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
              >
                <FiChevronLeft className="text-lg" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next 4 photos"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 border border-slate-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
              >
                <FiChevronRight className="text-lg" />
              </button>
            </div>
          </div>

          {/* 4 Photos in a Single Row Container */}
          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setGalleryHovered(true)}
            onMouseLeave={() => setGalleryHovered(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${gallerySlide * 100}%)` }}
            >
              {photoChunks.map((chunk, slideIdx) => (
                <div
                  key={slideIdx}
                  className="w-full shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5"
                >
                  {chunk.map((img, imgIdx) => (
                    <div
                      key={`${img.id}-${slideIdx}-${imgIdx}`}
                      className="bg-white rounded-2xl border border-slate-200/90 p-2 sm:p-2.5 shadow-2xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1 flex flex-col"
                    >
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 relative">
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets' + img.src;
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {photoChunks.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setGallerySlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  gallerySlide === dotIdx
                    ? 'w-8 bg-brand-700'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 7. Community Blogs Section */}
      <section className="py-10 sm:py-14 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Community Blogs"
            title="Insights from Our Community"
            subtitle="Share insights, stories and learning experiences"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-slate-700">{post.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-slate-400" />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors leading-snug mb-2.5">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors"
                  >
                    <span>Read Full Article</span>
                    <FiArrowRight className="text-[11px]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              to="/blog"
              variant="outline"
              size="md"
              icon={FiArrowRight}
              iconPosition="right"
            >
              Browse All Community Blogs
            </Button>
          </div>
        </div>
      </section>

    
      {/* 8. Authentic Results & Student Testimonials */}
      <section className="py-10 sm:py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Student Proof Points"
            title="Real Achievements from Real Students"
            subtitle="Verified testimonials directly from students who secured their target band scores and study visas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 6).map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      {[...Array(t.rating)].map((_, i) => (
                        <FiStar key={i} className="fill-current" />
                      ))}
                    </div>
                    {t.band && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-brand-100 text-brand-800">
                        {t.band}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-5">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  {t.destination && (
                    <span className="text-xs text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      📍 {t.destination}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (FAQ) Section */}
      <section id="faqs" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Clear answers about our IELTS coaching, batch schedules, offline Pune mentoring, fee structures, and published books."
            align="center"
          />

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-slate-900 hover:text-brand-800 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1">{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      isOpen ? 'bg-brand-50 text-brand-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FiChevronDown className="text-base" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need More Assistance prompt */}
          <div className="mt-8 text-center text-xs text-slate-500">
            Have questions that aren't answered here? Reach out directly to our admissions team.
          </div>
        </div>
      </section>

      {/* 10. Last Section of Home Page: Diagnostic Assessment Call to Action */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-200/90 shadow-sm hover:shadow-md transition-all text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
                Begin Your Journey
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug sm:leading-tight">
                Take the first step toward your target score or career communication goals.
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Book a diagnostic assessment directly with Master Trainer Vidya Wankhade. Both Pune in-person batches and remote online cohorts available.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-3 max-w-sm sm:max-w-none mx-auto">
                <Button
                  to="/contact"
                  variant="primary"
                  icon={FiArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto text-xs sm:text-base py-2.5 sm:py-3.5 px-5 sm:px-6 shadow-sm text-center justify-center font-semibold"
                >
                  Get In Touch & View Map
                </Button>
                <Button
                  href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`}
                  variant="secondary"
                  className="w-full sm:w-auto text-xs sm:text-base py-2.5 sm:py-3.5 px-5 sm:px-6 border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm font-semibold text-center justify-center"
                >
                  Call: {ACADEMY_INFO.contact.phone}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
