import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiBookOpen, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiSend 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { ADULT_COURSES, KIDS_COURSES } from '../data/academyData';
import Button from './Button';

export default function ContactForm({ initialCourse = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: initialCourse,
    message: '',
    privacyConsent: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!data.email.trim() && !data.phone.trim()) {
      errs.contact = 'Please provide either an email or phone number.';
    }

    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (data.phone.trim() && !/^[0-9+\s-]{8,15}$/.test(data.phone)) {
      errs.phone = 'Please enter a valid phone number (8-15 digits).';
    }

    if (!data.message.trim()) {
      errs.message = 'Please share your learning goals or questions.';
    } else if (data.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long.';
    }

    if (!data.privacyConsent) {
      errs.privacyConsent = 'You must acknowledge contact communication consent.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));

    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: val });
      setErrors(fieldErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      message: true,
      privacyConsent: true
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate accessible prototype submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      message: '',
      privacyConsent: false
    });
    setTouched({});
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs text-center">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Thank you, {formData.name}!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Your enquiry for <strong className="text-slate-800">{formData.course || 'English Learning'}</strong> has been received.
        </p>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs text-slate-600 max-w-md mx-auto mb-6 space-y-1">
          <div><strong className="text-slate-700">Name:</strong> {formData.name}</div>
          {formData.email && <div><strong className="text-slate-700">Email:</strong> {formData.email}</div>}
          {formData.phone && <div><strong className="text-slate-700">Phone:</strong> {formData.phone}</div>}
          <div><strong className="text-slate-700">Course:</strong> {formData.course || 'General Enquiry'}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href={`https://wa.me/917709109830?text=Hi%2C%20I%20am%20${encodeURIComponent(formData.name)}.%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(formData.course || 'courses')}.`}
            variant="primary"
            icon={FaWhatsapp}
            className="w-full sm:w-auto"
          >
            Chat on WhatsApp
          </Button>
          <Button
            onClick={handleReset}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Send Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Send an Admission Enquiry
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Fill in your details below for more information about our courses.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FiUser />
            </span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Aditi Sharma"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border bg-slate-50/40 text-slate-800 placeholder-slate-400 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700/20 ${
                errors.name && touched.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-brand-700'
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <p id="name-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <FiAlertCircle className="shrink-0" /> {errors.name}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiMail />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="aditi@example.com"
                aria-invalid={!!errors.email}
                className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border bg-slate-50/40 text-slate-800 placeholder-slate-400 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700/20 ${
                  errors.email && touched.email ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <FiAlertCircle className="shrink-0" /> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiPhone />
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 98765 43210"
                aria-invalid={!!errors.phone}
                className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border bg-slate-50/40 text-slate-800 placeholder-slate-400 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700/20 ${
                  errors.phone && touched.phone ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <FiAlertCircle className="shrink-0" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {errors.contact && (touched.email || touched.phone) && (
          <p className="text-xs text-rose-600 flex items-center gap-1">
            <FiAlertCircle className="shrink-0" /> {errors.contact}
          </p>
        )}

        {/* Programme Selection */}
        <div>
          <label htmlFor="course" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Programme of Interest
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <FiBookOpen />
            </span>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/40 text-slate-800 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
            >
              <option value="">Select a programme (Optional)</option>
              <optgroup label="Adults & Professionals">
                {ADULT_COURSES.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </optgroup>
              <optgroup label="Kids & Young Learners">
                {KIDS_COURSES.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Your Goals / Questions <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about your learning background, target band score, or current goals..."
              aria-invalid={!!errors.message}
              className={`w-full p-3 text-sm rounded-lg border bg-slate-50/40 text-slate-800 placeholder-slate-400 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-700/20 ${
                errors.message && touched.message ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-brand-700'
              }`}
            />
          </div>
          {errors.message && touched.message && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <FiAlertCircle className="shrink-0" /> {errors.message}
            </p>
          )}
        </div>

        {/* Privacy consent checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="privacyConsent"
              checked={formData.privacyConsent}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-0.5 rounded border-slate-300 text-brand-700 focus:ring-brand-700"
            />
            <span className="text-xs text-slate-600">
              I acknowledge that The Consistent Academy may contact me via WhatsApp, phone, or email to share course details and assess batch suitability.
            </span>
          </label>
          {errors.privacyConsent && touched.privacyConsent && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <FiAlertCircle className="shrink-0" /> {errors.privacyConsent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={isSubmitting}
          icon={FiSend}
        >
          {isSubmitting ? 'Validating...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
