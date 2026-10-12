import React, { useState, useMemo } from 'react';
import { 
  FiAward, 
  FiClock, 
  FiCheckCircle, 
  FiArrowRight, 
  FiArrowLeft, 
  FiRotateCcw, 
  FiBookOpen, 
  FiCheck, 
  FiX, 
  FiTrendingUp, 
  FiHelpCircle,
  FiMail,
  FiLock,
  FiUser,
  FiBriefcase,
  FiUserPlus,
  FiLogOut,
  FiSmile
} from 'react-icons/fi';
import { 
  KIDS_GRAMMAR_TEST, 
  ADULTS_GRAMMAR_TEST, 
  LEADERSHIP_TEST, 
  LEADERSHIP_STYLES 
} from '../data/testsData';
import SEO from '../components/SEO';
import Button from '../components/Button';

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly Disagree', weight: -2 },
  { value: 2, label: 'Disagree', weight: -1 },
  { value: 3, label: 'Neutral', weight: 0 },
  { value: 4, label: 'Agree', weight: 1 },
  { value: 5, label: 'Strongly Agree', weight: 2 },
];

const getCorrectIndex = (q) => {
  if (!q || q.correctAnswer === undefined || q.correctAnswer === null) return -1;
  if (typeof q.correctAnswer === 'string' && q.correctAnswer.length === 1) {
    const idx = ['a', 'b', 'c', 'd'].indexOf(q.correctAnswer.toLowerCase());
    if (idx !== -1) return idx;
  }
  if (typeof q.correctAnswer === 'number') {
    return q.correctAnswer;
  }
  if (Array.isArray(q.options)) {
    return q.options.indexOf(q.correctAnswer);
  }
  return -1;
};

export default function Tests() {
  // Authentication State (defaults to unauthenticated, asks to login first)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('tca_test_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Auth Card Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');
  const [authError, setAuthError] = useState('');

  // Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpFullName, setSignUpFullName] = useState('');
  const [signUpCompany, setSignUpCompany] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Test Runner State
  const [activeTestId, setActiveTestId] = useState(null); // 'kids' | 'adults' | 'leadership' | null
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: answer }
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle Sign In submission
  const handleSignIn = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please enter both your email address and password.');
      return;
    }
    const user = {
      name: loginEmail.split('@')[0],
      email: loginEmail,
      company: 'Learner'
    };
    try {
      localStorage.setItem('tca_test_user', JSON.stringify(user));
    } catch (err) {
      console.error('Storage error:', err);
    }
    setCurrentUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Sign Up submission
  const handleSignUp = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!signUpFullName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setAuthError('Please fill in all required fields.');
      return;
    }
    const user = {
      name: signUpFullName.trim(),
      company: signUpCompany.trim() || 'Individual',
      email: signUpEmail.trim()
    };
    try {
      localStorage.setItem('tca_test_user', JSON.stringify(user));
    } catch (err) {
      console.error('Storage error:', err);
    }
    setCurrentUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem('tca_test_user');
    setCurrentUser(null);
    setActiveTestId(null);
    setUserAnswers({});
    setIsCompleted(false);
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get active test object and flattened questions
  const activeTestData = activeTestId === 'kids' 
    ? KIDS_GRAMMAR_TEST 
    : activeTestId === 'adults' 
      ? ADULTS_GRAMMAR_TEST 
      : activeTestId === 'leadership' 
        ? LEADERSHIP_TEST 
        : null;

  const questionsList = activeTestData 
    ? activeTestData.sections.flatMap((sec) => sec.questions) 
    : [];

  const answeredCount = Object.keys(userAnswers).length;
  const remainingCount = Math.max(0, questionsList.length - answeredCount);

  const handleStartTest = (testId) => {
    setActiveTestId(testId);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId, optionValue) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setActiveTestId(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live stats tracking correct/missed answers on the spot
  const liveStats = useMemo(() => {
    if (activeTestId === 'leadership') {
      return { correct: 0, missed: 0 };
    }
    let correct = 0;
    let missed = 0;
    questionsList.forEach((q) => {
      const sel = userAnswers[q.id];
      if (sel !== undefined) {
        const correctIdx = getCorrectIndex(q);
        const selIdx = typeof sel === 'number' ? sel : q.options?.indexOf(sel);
        if (selIdx === correctIdx) {
          correct++;
        } else {
          missed++;
        }
      }
    });
    return { correct, missed };
  }, [activeTestId, questionsList, userAnswers]);

  // Grammar Test Scoring calculations
  const calculateGrammarScore = () => {
    let correctCount = 0;
    questionsList.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected !== undefined) {
        const correctIdx = getCorrectIndex(q);
        const selectedIdx = typeof selected === 'number' ? selected : q.options?.indexOf(selected);
        if (selectedIdx === correctIdx) {
          correctCount++;
        }
      }
    });

    const total = questionsList.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    let level = 'Beginner / Foundational';
    let recommendation = 'Foundational Grammar & Speech Cohort';

    if (percentage >= 85) {
      level = 'Advanced Mastery (C1 / C2 Proficiency)';
      recommendation = 'Global English Master Program / Advanced IELTS Fast-Track';
    } else if (percentage >= 65) {
      level = 'Intermediate Competence (B1 / B2 Level)';
      recommendation = '20-Hour English Proficiency Master Program or Crack Your Interview';
    } else if (percentage >= 45) {
      level = 'Elementary Level (A2 / B1 Level)';
      recommendation = 'Foundational English & Spoken Mentoring';
    }

    return { correctCount, total, percentage, level, recommendation };
  };

  // Leadership Assessment Scoring calculations
  const calculateLeadershipResults = () => {
    const scoresByStyle = {};

    questionsList.forEach((q) => {
      const style = q.leadershipStyle || 'democratic';
      const answerVal = userAnswers[q.id] || 3;
      const weight = LIKERT_OPTIONS.find((opt) => opt.value === answerVal)?.weight || 0;
      scoresByStyle[style] = (scoresByStyle[style] || 0) + weight;
    });

    let dominantStyleKey = 'democratic';
    let maxScore = -999;
    Object.keys(scoresByStyle).forEach((style) => {
      if (scoresByStyle[style] > maxScore) {
        maxScore = scoresByStyle[style];
        dominantStyleKey = style;
      }
    });

    const profile = LEADERSHIP_STYLES[dominantStyleKey] || {
      name: 'Balanced Collaborative Leader',
      description: 'You blend participatory team involvement with pragmatic goal achievement, tailoring your engagement to project urgency and team maturity.',
      strengths: ['Adaptive problem solving', 'High team engagement and buy-in', 'Clear communication'],
      growthAreas: ['Balancing consensus with time-sensitive decisions']
    };

    return { dominantStyleKey, profile, scoresByStyle };
  };

  return (
    <>
      <SEO
        title="Diagnostic English & Leadership Tests | The Consistent Academy"
        description="Free online English proficiency tests for kids, adult grammar diagnostic, and comprehensive 60-question leadership style assessment with immediate scoring."
      />

      {/* STEP 1: AUTHENTICATION GATE (FOCUSED & PERFECTLY CENTERED) */}
      {!currentUser ? (
        <section className="flex-grow flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-slate-50 min-h-[calc(100vh-5rem)]">
          <div className="w-full max-w-md mx-auto">
            {/* Card Container with academy styling */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-7 sm:p-9">
              {/* Header inside Card */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center text-xl mx-auto mb-3 shadow-xs">
                  <FiAward />
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome to Tests
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  {authMode === 'signin' ? 'Sign in to access your assessment' : 'Create an account to get started'}
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    authMode === 'signin'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    authMode === 'signup'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error message */}
              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
                  {authError}
                </div>
              )}

              {/* Sign In Form */}
              {authMode === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center mt-5"
                    icon={FiArrowRight}
                    iconPosition="right"
                  >
                    Sign In
                  </Button>

                  <p className="mt-4 text-center text-xs text-slate-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthError('');
                      }}
                      className="font-bold text-brand-700 hover:text-brand-800 transition-colors ml-0.5"
                    >
                      Create One
                    </button>
                  </p>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={signUpFullName}
                        onChange={(e) => setSignUpFullName(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company / Organisation
                    </label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        value={signUpCompany}
                        onChange={(e) => setSignUpCompany(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center mt-4"
                    icon={FiUserPlus}
                    iconPosition="left"
                  >
                    Create Account
                  </Button>

                  <p className="mt-4 text-center text-xs text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setAuthError('');
                      }}
                      className="font-bold text-brand-700 hover:text-brand-800 transition-colors ml-0.5"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </div>

            {/* Reassurance footer */}
            <p className="mt-5 text-center text-xs text-slate-500 font-medium">
              100% Free Assessments • Instant Detailed Scoring • No Spam
            </p>
          </div>
        </section>
      ) : !activeTestId ? (
        /* STEP 2: CHOOSE YOUR TEST (UNIFIED ACADEMY DASHBOARD) */
        <>
          {/* Dedicated Header for Authenticated Portal */}
          <section className="bg-white border-b border-slate-200/80 py-10 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200 mb-3">
                    Academic Diagnostics
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Choose Your Diagnostic Assessment
                  </h1>
                  <p className="mt-2 text-base text-slate-600 leading-relaxed font-normal">
                    Select an assessment below. All tests are 100% free with instant detailed scoring, error analysis, and CEFR level mapping.
                  </p>
                </div>

                {/* User Session Banner & Sign Out */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 self-start md:self-auto shrink-0 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 leading-tight">{currentUser.name || 'Learner'}</p>
                    <p className="text-slate-500 text-[11px] leading-tight">{currentUser.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="ml-2 text-slate-400 hover:text-red-600 transition-colors p-1"
                  >
                    <FiLogOut className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Assessment Cards Grid */}
          <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {/* Kids Test */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                        Age 5-17 Years
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <FiClock className="text-slate-400" /> 15-20 Mins
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center text-xl mb-3 shadow-xs">
                      <FiSmile />
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-2">
                      Kids Grammar & Vocabulary
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      Designed for school students to evaluate preposition mastery, correct article usage, analogy logic, synonyms, and sentence construction.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-sky-600 text-sm shrink-0 mt-0.5" />
                        <span>25 Questions covering basic grammar concepts</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-sky-600 text-sm shrink-0 mt-0.5" />
                        <span>Fill in the blanks, analogies, synonyms, and more</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-sky-600 text-sm shrink-0 mt-0.5" />
                        <span>Age-appropriate school level difficulty</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={FiArrowRight}
                    iconPosition="right"
                    onClick={() => handleStartTest('kids')}
                  >
                    Start Kids Test
                  </Button>
                </div>

                {/* Adults Test */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                        Advanced Learners
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <FiClock className="text-slate-400" /> 20-25 Mins
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-700 border border-brand-100 flex items-center justify-center text-xl mb-3 shadow-xs">
                      <FiBookOpen />
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-2">
                      Adults Grammar & Fluency
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      Comprehensive assessment of subject-verb agreement, subjunctive conditionals, idioms, inversion grammar, and corporate fluency.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-brand-600 text-sm shrink-0 mt-0.5" />
                        <span>28 Questions covering advanced grammar</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-brand-600 text-sm shrink-0 mt-0.5" />
                        <span>Idioms, analogies, vocabulary, sentence improvement</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-brand-600 text-sm shrink-0 mt-0.5" />
                        <span>Professional corporate & IELTS readiness benchmark</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={FiArrowRight}
                    iconPosition="right"
                    onClick={() => handleStartTest('adults')}
                  >
                    Start Adults Test
                  </Button>
                </div>

                {/* Leadership Test */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        Style Assessment
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <FiClock className="text-slate-400" /> 25-30 Mins
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center text-xl mb-3 shadow-xs">
                      <FiAward />
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors mb-2">
                      Executive Leadership Style
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      A validated 60-question psychometric diagnostic measuring tendencies across Autocratic, Democratic, Transformational, and Situational styles.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-amber-600 text-sm shrink-0 mt-0.5" />
                        <span>60 Questions across 6 leadership dimensions</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-amber-600 text-sm shrink-0 mt-0.5" />
                        <span>Discover your dominant leadership style profile</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <FiCheckCircle className="text-amber-600 text-sm shrink-0 mt-0.5" />
                        <span>Actionable executive development recommendations</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={FiArrowRight}
                    iconPosition="right"
                    onClick={() => handleStartTest('leadership')}
                  >
                    Start Leadership Test
                  </Button>
                </div>
              </div>

              {/* Quality Highlights Bar */}
              <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center mx-auto text-base">
                      <FiCheckCircle />
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">Instant CEFR Level Mapping</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Results are mapped to CEFR (Common European Framework of Reference) standards.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-base">
                      <FiTrendingUp />
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">Pinpoint Error Analysis</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Review which questions you missed with concise grammatical rationales.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto text-base">
                      <FiHelpCircle />
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">Personalized Next Steps</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Get clear course recommendations tailored to your score without sales pressure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : isCompleted ? (
        /* STEP 3: RESULTS SCREEN */
        <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm animate-fadeIn">
              {activeTestId === 'leadership' ? (
                /* Leadership Results */
                (() => {
                  const { profile } = calculateLeadershipResults();
                  return (
                    <div className="space-y-6">
                      <div className="text-center pb-6 border-b border-slate-200">
                        <span className="text-xs font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                          Diagnostic Completed
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-1">
                          {profile.name || 'Leadership Style'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500">
                          Based on your 60 psychometric responses across operational and team scenarios.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider">
                          Leadership Profile Overview
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {profile.description}
                        </p>
                      </div>

                      {profile.strengths && profile.strengths.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider">
                            Key Leadership Strengths
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {profile.strengths.map((str, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                <FiCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
                                <span>{str}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendation Box */}
                      <div className="p-5 rounded-xl bg-brand-50 border border-brand-200 space-y-2">
                        <h4 className="font-heading font-bold text-brand-900 text-sm">
                          Recommended Executive Development Track
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700">
                          Sharpen your executive presence, presentation authority, and high-stakes negotiation skills with our <strong>Corporate Survival</strong> and <strong>Crack Your Interview</strong> masterclasses.
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={handleBackToHub}
                          className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          ← Choose Another Test
                        </button>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={handleRetake}
                            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <FiRotateCcw /> Retake
                          </button>
                          <Button
                            to="/contact"
                            variant="primary"
                            size="sm"
                            className="flex-1 sm:flex-none text-xs"
                          >
                            Schedule Consultation
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                /* Grammar Tests Results */
                (() => {
                  const { correctCount, total, percentage, level, recommendation } = calculateGrammarScore();
                  return (
                    <div className="space-y-6">
                      <div className="text-center pb-6 border-b border-slate-200">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-800 text-2xl font-bold mb-3">
                          {percentage}%
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                          {correctCount} / {total} Correct
                        </h2>
                        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 mt-1">
                          Level: {level}
                        </span>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                        <h4 className="font-heading font-bold text-slate-900 text-sm">
                          Recommended Learning Path
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          Based on your responses, we recommend enrolling in: <strong>{recommendation}</strong>. Our mentors work with small cohorts to ensure targeted personal improvement.
                        </p>
                      </div>

                      {/* Question Review Section */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider">
                          Question Review & Explanations
                        </h4>
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                          {questionsList.map((q, idx) => {
                            const userAnswer = userAnswers[q.id];
                            const correctIdx = getCorrectIndex(q);
                            const userIdx = userAnswer !== undefined
                              ? (typeof userAnswer === 'number' ? userAnswer : q.options?.indexOf(userAnswer))
                              : -1;
                            const isCorrect = userIdx !== -1 && userIdx === correctIdx;

                            return (
                              <div key={q.id} className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                  <span className="font-semibold text-slate-900">
                                    Q{idx + 1}. {q.question}
                                  </span>
                                  {isCorrect ? (
                                    <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                                      <FiCheck /> Correct
                                    </span>
                                  ) : (
                                    <span className="text-red-600 font-bold flex items-center gap-1 shrink-0">
                                      <FiX /> Missed
                                    </span>
                                  )}
                                </div>
                                <p className="text-slate-500">
                                  Your answer: <span className="font-medium text-slate-700">{userIdx !== -1 ? `${['A', 'B', 'C', 'D'][userIdx] || ''}: ${q.options[userIdx]}` : 'Unanswered'}</span>
                                </p>
                                {!isCorrect && correctIdx !== -1 && (
                                  <p className="text-emerald-700 font-medium">
                                    Correct answer: {['A', 'B', 'C', 'D'][correctIdx]}: {q.options[correctIdx]}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={handleBackToHub}
                          className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        >
                          ← Choose Another Test
                        </button>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={handleRetake}
                            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <FiRotateCcw /> Retake
                          </button>
                          <Button
                            to="/contact"
                            variant="primary"
                            size="sm"
                            className="flex-1 sm:flex-none text-xs"
                          >
                            Discuss with Mentor
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </section>
      ) : (
        /* STEP 4: INTERACTIVE TEST RUNNER */
        <section className="py-8 sm:py-12 bg-slate-50 min-h-[70vh] border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Bar: Back, Title & Question Counter */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBackToHub}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <FiArrowLeft />
                <span>Exit Assessment</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="text-xs font-semibold text-slate-600">
                  Question <span className="text-slate-900 font-bold">{currentQuestionIndex + 1}</span> of {questionsList.length}
                </div>
                {activeTestId !== 'leadership' && userAnswers[questionsList[currentQuestionIndex]?.id] !== undefined && (
                  (() => {
                    const currentQ = questionsList[currentQuestionIndex];
                    const sel = userAnswers[currentQ?.id];
                    const cIdx = getCorrectIndex(currentQ);
                    const sIdx = typeof sel === 'number' ? sel : currentQ?.options?.indexOf(sel);
                    const isRight = sIdx === cIdx;
                    return (
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        isRight 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {isRight ? <><FiCheck className="stroke-[2.5]" /> Correct</> : <><FiX className="stroke-[2.5]" /> Missed</>}
                      </span>
                    );
                  })()
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-8">
              <div
                className="bg-brand-700 h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%`
                }}
              />
            </div>

            {/* Split 2-Column Assessment Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Question Card (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                {/* Section Tag */}
                {questionsList[currentQuestionIndex]?.section && (
                  <span className="inline-block text-[11px] font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 mb-4">
                    {questionsList[currentQuestionIndex].section}
                  </span>
                )}

                {/* Question Prompt */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
                  {questionsList[currentQuestionIndex]?.question}
                </h3>

                {/* Options List */}
                {activeTestId === 'leadership' ? (
                  /* Likert 5-point scale for Leadership */
                  <div className="space-y-2.5">
                    {LIKERT_OPTIONS.map((opt) => {
                      const qId = questionsList[currentQuestionIndex].id;
                      const isSelected = userAnswers[qId] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectOption(qId, opt.value)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-brand-700 bg-brand-50/80 text-brand-900 shadow-xs'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-brand-700 bg-brand-700' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* 4 Choice Selectors for Grammar Tests with Instant Correct/Incorrect Feedback */
                  (() => {
                    const currentQ = questionsList[currentQuestionIndex];
                    const qId = currentQ?.id;
                    const userSelection = userAnswers[qId];
                    const hasSelected = userSelection !== undefined;
                    const correctIdx = getCorrectIndex(currentQ);
                    const userSelectedIndex = hasSelected
                      ? (typeof userSelection === 'number' ? userSelection : currentQ?.options?.indexOf(userSelection))
                      : -1;
                    const isUserCorrect = hasSelected && userSelectedIndex === correctIdx;

                    return (
                      <div>
                        <div className="space-y-2.5">
                          {currentQ?.options?.map((opt, optIdx) => {
                            const optionLabel = ['A', 'B', 'C', 'D'][optIdx] || optIdx + 1;
                            const isThisOptionSelected = userSelectedIndex === optIdx;
                            const isThisOptionCorrect = optIdx === correctIdx;

                            // Dynamic styles for instant on-the-spot feedback
                            let buttonClasses = 'border-slate-200 bg-white hover:bg-slate-50 hover:border-brand-400 text-slate-800';
                            let badgeClasses = 'bg-slate-100 text-slate-700';
                            let indicatorNode = null;

                            if (hasSelected) {
                              if (isThisOptionSelected && isThisOptionCorrect) {
                                // User picked this and it is correct
                                buttonClasses = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs';
                                badgeClasses = 'bg-emerald-600 text-white';
                                indicatorNode = (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
                                    <FiCheck className="stroke-[3]" /> Correct
                                  </span>
                                );
                              } else if (isThisOptionSelected && !isThisOptionCorrect) {
                                // User picked this and it is wrong
                                buttonClasses = 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-400/20 shadow-xs';
                                badgeClasses = 'bg-red-600 text-white';
                                indicatorNode = (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 px-2.5 py-1 rounded-md shrink-0">
                                    <FiX className="stroke-[3]" /> Incorrect
                                  </span>
                                );
                              } else if (!isThisOptionSelected && isThisOptionCorrect) {
                                // Correct option revealed when user made an incorrect choice
                                buttonClasses = 'border-emerald-500 bg-emerald-50/50 text-emerald-900 ring-1 ring-emerald-500/30';
                                badgeClasses = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
                                indicatorNode = (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md shrink-0">
                                    <FiCheck /> Correct Answer
                                  </span>
                                );
                              } else {
                                // Other neutral unselected options
                                buttonClasses = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60 hover:opacity-80';
                                badgeClasses = 'bg-slate-100 text-slate-400';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectOption(qId, optIdx)}
                                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${buttonClasses}`}
                              >
                                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${badgeClasses}`}>
                                  {optionLabel}
                                </span>
                                <span className="flex-1">{opt}</span>
                                {indicatorNode}
                              </button>
                            );
                          })}
                        </div>

                        {/* On the spot instant feedback banner */}
                        {hasSelected && correctIdx !== -1 && (
                          <div className={`mt-6 p-4 sm:p-5 rounded-2xl border transition-all animate-fadeIn ${
                            isUserCorrect 
                              ? 'bg-emerald-50/90 border-emerald-200 shadow-xs' 
                              : 'bg-red-50/90 border-red-200 shadow-xs'
                          }`}>
                            <div className="flex items-start gap-3.5">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold ${
                                isUserCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                              }`}>
                                {isUserCorrect ? <FiCheckCircle /> : <FiX className="stroke-[2.5]" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-heading font-extrabold text-sm sm:text-base ${
                                    isUserCorrect ? 'text-emerald-950' : 'text-red-950'
                                  }`}>
                                    {isUserCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
                                  </h4>
                                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    isUserCorrect 
                                      ? 'bg-emerald-200/90 text-emerald-900' 
                                      : 'bg-red-200/90 text-red-900'
                                  }`}>
                                    {isUserCorrect ? '+1 Point' : '0 Points'}
                                  </span>
                                </div>

                                <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                                  isUserCorrect ? 'text-emerald-800' : 'text-red-800'
                                }`}>
                                  {isUserCorrect ? (
                                    <span>
                                      Great job! Option <strong className="font-bold text-emerald-950">{['A', 'B', 'C', 'D'][correctIdx]}</strong> ({currentQ.options[correctIdx]}) is the correct answer.
                                    </span>
                                  ) : (
                                    <span>
                                      The correct answer is Option <strong className="font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-red-200">{['A', 'B', 'C', 'D'][correctIdx]}: {currentQ.options[correctIdx]}</strong>.
                                    </span>
                                  )}
                                </p>

                                {/* Direct Next/Submit quick action inside feedback card */}
                                <div className={`mt-3.5 pt-3 border-t flex items-center justify-between gap-3 ${
                                  isUserCorrect ? 'border-emerald-200/80' : 'border-red-200/80'
                                }`}>
                                  <span className={`text-[11px] font-medium hidden sm:inline ${
                                    isUserCorrect ? 'text-emerald-700' : 'text-red-700'
                                  }`}>
                                    {currentQuestionIndex < questionsList.length - 1
                                      ? 'Advance to the next question when ready:'
                                      : 'All done! Proceed to your diagnostic summary:'}
                                  </span>
                                  {currentQuestionIndex < questionsList.length - 1 ? (
                                    <button
                                      type="button"
                                      onClick={handleNext}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-xs ml-auto"
                                    >
                                      <span>Next Question</span>
                                      <FiArrowRight className="text-xs" />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={handleSubmitTest}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs ml-auto"
                                    >
                                      <span>View Final Results</span>
                                      <FiCheckCircle className="text-xs" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Right Column: Sticky Progress & Controls Card (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                <h4 className="font-heading text-base font-bold text-slate-900 mb-1">
                  {activeTestData?.title}
                </h4>
                <p className="text-xs text-slate-500 mb-5">
                  Academic Diagnostic Engine
                </p>

                <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-slate-100">
                    <span>Questions Answered</span>
                    <span className="font-bold text-slate-900">{answeredCount} / {questionsList.length}</span>
                  </div>
                  {activeTestId !== 'leadership' && (
                    <>
                      <div className="flex items-center justify-between text-emerald-700 pb-2 border-b border-slate-100">
                        <span className="flex items-center gap-1.5 font-medium">
                          <FiCheck className="text-emerald-600" /> Correct
                        </span>
                        <span className="font-bold">{liveStats.correct}</span>
                      </div>
                      <div className="flex items-center justify-between text-red-600 pb-2 border-b border-slate-100">
                        <span className="flex items-center gap-1.5 font-medium">
                          <FiX className="text-red-500" /> Missed
                        </span>
                        <span className="font-bold">{liveStats.missed}</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-slate-100">
                    <span>Remaining</span>
                    <span className="font-bold text-slate-500">{remainingCount}</span>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-brand-700 h-full rounded-full transition-all duration-300"
                    style={{ width: `${questionsList.length > 0 ? (answeredCount / questionsList.length) * 100 : 0}%` }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentQuestionIndex === 0}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                        currentQuestionIndex === 0
                          ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <FiArrowLeft /> Previous
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={currentQuestionIndex === questionsList.length - 1}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        currentQuestionIndex === questionsList.length - 1
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-brand-700 hover:bg-brand-800 text-white'
                      }`}
                    >
                      Next <FiArrowRight />
                    </button>
                  </div>

                  {/* Submission Status Pill / Button */}
                  {remainingCount > 0 ? (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-semibold text-slate-500">
                      Answer {remainingCount} more to submit
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleSubmitTest}
                      className="w-full justify-center text-xs !bg-emerald-600 hover:!bg-emerald-700"
                      icon={FiCheckCircle}
                      iconPosition="left"
                    >
                      Submit Assessment
                    </Button>
                  )}

                  <button
                    type="button"
                    onClick={handleBackToHub}
                    className="w-full pt-2 text-center text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
                  >
                    Save & Exit to Hub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
