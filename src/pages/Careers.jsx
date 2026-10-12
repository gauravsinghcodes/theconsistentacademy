import React, { useState } from 'react';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiCheckCircle, 
  FiX, 
  FiSend,
  FiUsers
} from 'react-icons/fi';
import { CAREER_ROLES } from '../data/academyData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import SEO from '../components/SEO';

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    role: '',
    experience: '1-3 years',
    resumeLink: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyClick = (roleTitle) => {
    setFormData((prev) => ({ ...prev, role: roleTitle }));
    const formElement = document.getElementById('career-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate direct client submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      contact: '',
      role: '',
      experience: '1-3 years',
      resumeLink: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <>
      <SEO 
        title="Careers | Join The Consistent Academy Faculty"
        description="Explore teaching and mentoring opportunities at The Consistent Academy. Openings for IELTS trainers, spoken English mentors, teaching assistants, and communication coaches."
      />

      {/* Hero Header with v22.jpeg gallery background */}
      <section className="relative text-white py-16 sm:py-20 overflow-hidden bg-slate-950">
        {/* Background Image: v22 from gallery (lighter treatment) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gallery/v22.jpeg"
            alt="Academic faculty and mentors"
            className="w-full h-full object-cover object-[center_35%] opacity-80 sm:opacity-90 filter brightness-110 contrast-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/gallery/v22.jpeg';
            }}
          />
          {/* Lighter ambient gradient overlay for balanced clarity and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-900/40 to-slate-950/65" />
          <div className="absolute inset-0 bg-radial-at-t from-brand-900/30 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4 tracking-wide uppercase backdrop-blur-xs">
            <FiUsers className="text-sm" /> Join Our Academic Faculty
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-xs">
            Build Meaningful Careers in <span className="text-brand-300">Language Education</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Empower aspiring international students, young learners, and corporate executives to communicate with natural authority. Work alongside British Council certified master trainers.
          </p>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Current Openings"
            title="Faculty & Mentorship Positions"
            subtitle="Select any opening below to view full requirements or apply directly."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CAREER_ROLES.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                      {role.department}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <FiMapPin className="text-[12px] text-slate-400" />
                      {role.location}
                    </span>
                  </div>

                  {/* Title & Type */}
                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-1.5">
                    {role.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
                    <FiBriefcase className="text-brand-600" />
                    <span>{role.type}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {role.description}
                  </p>

                  {/* Key Highlights preview */}
                  <div className="border-t border-slate-100 pt-3 mb-4 space-y-1.5">
                    <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Key Requirement:
                    </p>
                    <p className="text-xs text-slate-600 flex items-start gap-1.5">
                      <FiCheckCircle className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{role.requirements[0]}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-800 hover:bg-slate-50 transition-colors text-center"
                  >
                    View Details
                  </button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleApplyClick(role.title)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Details Modal Popup */}
      {selectedRole && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedRole(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
                  {selectedRole.department}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {selectedRole.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                aria-label="Close role modal"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-brand-50/60 p-3 rounded-lg border border-brand-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <FiBriefcase className="text-brand-700" /> {selectedRole.type}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <FiMapPin className="text-brand-700" /> {selectedRole.location}
                </span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-1.5">
                  Role Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedRole.description}
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-2">
                  Key Responsibilities
                </h4>
                <ul className="space-y-1.5">
                  {selectedRole.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <FiCheckCircle className="text-brand-600 mt-0.5 shrink-0 text-sm" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm mb-2">
                  Requirements & Qualifications
                </h4>
                <ul className="space-y-1.5">
                  {selectedRole.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <FiCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
              >
                Close
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const roleName = selectedRole.title;
                  setSelectedRole(null);
                  handleApplyClick(roleName);
                }}
              >
                Apply for this Position
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Section */}
      <section id="career-application-form" className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Direct Application"
            title="Submit Your Faculty Profile"
            subtitle="Share your credentials and experience. Our academic team reviews every profile carefully."
            center
          />

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <FiCheckCircle />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Application Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for applying to join The Consistent Academy faculty. Our academic team will review your credentials and contact you within 2 business days.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-4 px-5 py-2.5 text-xs font-semibold rounded-lg bg-brand-800 text-white hover:bg-brand-900 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Contact Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                    />
                  </div>

                  {/* Role Applying For */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Role Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                    >
                      <option value="">Select an Open Position</option>
                      {CAREER_ROLES.map((r) => (
                        <option key={r.id} value={r.title}>
                          {r.title} ({r.department})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Teaching Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                    >
                      <option value="Fresher / Less than 1 year">Fresher / Less than 1 year</option>
                      <option value="1-3 years">1 to 3 years</option>
                      <option value="3-5 years">3 to 5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Resume Link (Google Drive / Portfolio) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="resumeLink"
                      required
                      placeholder="https://drive.google.com/..."
                      value={formData.resumeLink}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all"
                    />
                  </div>
                </div>

                {/* Cover Note */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Brief Statement of Purpose / Notes
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us about your teaching philosophy, IELTS score (if applicable), and availability..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    disabled={isSubmitting}
                    icon={FiSend}
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Faculty Application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
