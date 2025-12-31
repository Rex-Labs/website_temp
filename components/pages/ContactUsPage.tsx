import React, { useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only open modal if form is filled
    if (name && email && message) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmSend = () => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    // Simulate a short delay to show the loading state before redirecting
    setTimeout(() => {
      const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      // Send to both addresses
      const mailtoLink = `mailto:RexLabsOfficial@gmail.com,26dwivediom@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto scroll-animation">
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter">Let's build together.</h2>
          <p className="mt-6 text-xl sm:text-2xl text-gray-400 leading-relaxed">Have a project in mind, a question, or just want to say hello? We'd love to connect.</p>
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 sm:p-12 rounded-2xl scroll-animation" style={{ transitionDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input type="text" name="name" id="name" required className="block w-full bg-white/10 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-all" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input type="email" name="email" id="email" required className="block w-full bg-white/10 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea name="message" id="message" rows={4} required className="block w-full bg-white/10 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white transition-all" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <div>
                <button 
                  ref={ctaRef}
                  type="submit" 
                  disabled={isSubmitting}
                  onMouseMove={(e) => {
                    if (prefersReducedMotion || !ctaRef.current) return;
                    const rect = ctaRef.current.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const moveX = (x - centerX) * 0.08;
                    const moveY = (y - centerY) * 0.08;
                    ctaRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                  }}
                  onMouseLeave={() => {
                    if (!ctaRef.current) return;
                    ctaRef.current.style.transform = '';
                  }}
                  className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center tap-friendly text-lg md:text-base py-3.5 md:py-3 px-10 md:px-8 border border-transparent rounded-lg shadow-sm font-semibold text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-white transition-all will-change-transform hover:shadow-lg hover:shadow-white/20 disabled:opacity-75 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
              {submitted && !isSubmitting && (
                <p className="mt-4 text-sm text-center text-gray-400">
                  Your email client should be open. Please complete sending your message there.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 max-w-sm w-full mx-4">
            <h3 id="modal-title" className="text-2xl font-bold text-white">Confirm Submission</h3>
            <p className="mt-4 text-gray-400">
              This will open your default email client to send the message. Do you want to proceed?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="tap-friendly py-2.5 md:py-2 px-7 md:px-6 border border-white/20 rounded-lg text-base md:text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                className="tap-friendly py-2.5 md:py-2 px-7 md:px-6 border border-transparent rounded-lg shadow-sm text-base md:text-sm font-semibold text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:ring-white transition-all transform hover:scale-[1.03]"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUsPage;