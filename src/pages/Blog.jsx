import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiCalendar, 
  FiUser, 
  FiArrowRight, 
  FiArrowLeft,
  FiX, 
  FiEdit3, 
  FiCheckCircle, 
  FiSend 
} from 'react-icons/fi';
import { BLOG_POSTS } from '../data/academyData';
import Button from '../components/Button';
import SEO from '../components/SEO';

export default function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [guestPostSubmitted, setGuestPostSubmitted] = useState(false);
  const [guestFormData, setGuestFormData] = useState({
    title: '',
    author: '',
    email: '',
    content: ''
  });

  // If URL has /blog/:id, set activeArticle
  useEffect(() => {
    if (id) {
      const found = BLOG_POSTS.find((p) => p.id === id);
      if (found) {
        setActiveArticle(found);
      }
    } else {
      setActiveArticle(null);
    }
  }, [id]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return BLOG_POSTS;
    const q = searchQuery.toLowerCase();
    return BLOG_POSTS.filter((post) => 
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleGuestInputChange = (e) => {
    const { name, value } = e.target;
    setGuestFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    setGuestPostSubmitted(true);
  };

  const resetGuestForm = () => {
    setGuestFormData({
      title: '',
      author: '',
      email: '',
      content: ''
    });
    setGuestPostSubmitted(false);
    setIsSubmitModalOpen(false);
  };

  const openArticle = (post) => {
    setActiveArticle(post);
    navigate(`/blog/${post.id}`, { replace: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setActiveArticle(null);
    navigate('/blog', { replace: false });
  };

  return (
    <>
      <SEO
        title="Community Blogs | The Consistent Academy"
        description="Share insights, stories and learning experiences. Authentic community blogs from The Consistent Academy."
      />

      {/* Hero Header with v1.png gallery background */}
      <section className="relative text-white py-14 sm:py-20 overflow-hidden bg-slate-950">
        {/* Background Image: v1 from gallery (lighter treatment) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery/v1.png"
            alt="Community classroom learning"
            className="w-full h-full object-cover object-[center_65%] opacity-80 sm:opacity-90 filter brightness-110 contrast-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/gallery/v1.png';
            }}
          />
          {/* Lighter ambient gradient overlay for balanced clarity and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-900/40 to-slate-950/65" />
          <div className="absolute inset-0 bg-radial-at-t from-brand-900/30 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 drop-shadow-xs">
            Community Blogs
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed mb-6 font-normal">
            Share insights, stories and learning experiences 
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <FiEdit3 />
              <span>Write a Blog</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar Bar */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-18 sm:top-20 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community blogs by title, author, keyword..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-700 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FiX className="text-xs" />
                </button>
              )}
            </div>

            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Showing {filteredPosts.length} of {BLOG_POSTS.length} posts
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="py-10 sm:py-14 bg-slate-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Detailed Single Article View if selected or /blog/:id */}
          {activeArticle ? (
            <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm animate-fadeIn">
              <div className="mb-6 pb-4 border-b border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closeArticle}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                >
                  <FiArrowLeft />
                  <span>Back to all blogs</span>
                </button>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="text-slate-400" />
                    {activeArticle.date}
                  </span>
                </div>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mb-8 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs">
                  {activeArticle.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900">{activeArticle.author}</span>
                  <span className="text-slate-400 text-xs ml-2">Author</span>
                </div>
              </div>

              {/* Verbatim Content Rendering */}
              <div className="prose prose-slate max-w-none space-y-4 text-slate-700 leading-relaxed font-sans text-sm sm:text-base">
                {activeArticle.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('**') && block.endsWith('**')) {
                    return (
                      <h3 key={idx} className="font-heading text-base sm:text-lg font-bold text-slate-900 pt-2">
                        {block.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (block.includes('\n- ')) {
                    const parts = block.split('\n');
                    const header = parts[0];
                    const items = parts.slice(1);
                    return (
                      <div key={idx} className="space-y-1">
                        {header && <p className="font-semibold text-slate-900">{header.replace(/\*\*/g, '')}</p>}
                        <ul className="list-disc pl-5 space-y-1">
                          {items.map((item, iIdx) => (
                            <li key={iIdx} className="text-slate-700">
                              {item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-slate-700 leading-relaxed">
                      {block.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  );
                })}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closeArticle}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                >
                  <FiArrowLeft />
                  <span>Back to Blog List</span>
                </button>
                <Button
                  to="/contact"
                  variant="primary"
                  size="sm"
                  className="text-xs"
                >
                  Connect with Mentors
                </Button>
              </div>
            </article>
          ) : (
            /* Blog Grid View */
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                  <FiBookOpen className="text-4xl text-slate-300 mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-1">
                    No articles match your search
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
                    Try searching for different keywords.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-800 text-white hover:bg-brand-900 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between h-full group"
                    >
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <FiUser className="text-brand-600" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiCalendar className="text-slate-400" />
                            {post.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors leading-snug mb-3">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openArticle(post)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors"
                        >
                          <span>Read Full Article</span>
                          <FiArrowRight />
                        </button>
                        <span className="text-[11px] text-slate-400">
                          Community Post
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Write a Blog Modal matching live website capability */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsSubmitModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Write a Blog
                </h3>
                <p className="text-xs text-slate-500">
                  Share insights, stories and learning experiences
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="p-6">
              {guestPostSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
                    <FiCheckCircle />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-base">
                    Blog submitted for approval!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Our team will review your post before it appears in Community Blogs.
                  </p>
                  <button
                    type="button"
                    onClick={resetGuestForm}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-800 text-white hover:bg-brand-900 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGuestSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="Title of your blog"
                      value={guestFormData.title}
                      onChange={handleGuestInputChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Author Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="author"
                        required
                        placeholder="Your name"
                        value={guestFormData.author}
                        onChange={handleGuestInputChange}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        value={guestFormData.email}
                        onChange={handleGuestInputChange}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="content"
                      required
                      rows="5"
                      placeholder="Write your article content here..."
                      value={guestFormData.content}
                      onChange={handleGuestInputChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      icon={FiSend}
                      iconPosition="right"
                    >
                      Submit Blog
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
