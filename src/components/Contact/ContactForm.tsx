import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Button from '../UI/Button';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          'service_wqv4bcl',
          'template_obkzj2m',
          formRef.current,
          'TpRMxjrXayM9j2VdR'
        );

        setSubmissionStatus('success');
        setFormState({ name: '', email: '', message: '' });

        setTimeout(() => {
          setSubmissionStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmissionStatus('error');

      setTimeout(() => {
        setSubmissionStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-8"
    >
      <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Get In Touch</h3>

      {submissionStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Your message has been sent successfully! I'll get back to you soon.</p>
        </div>
      )}

      {submissionStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>There was an error sending your message. Please try again later.</p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-dark-700 dark:text-white"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-dark-700 dark:text-white"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-dark-700 dark:text-white resize-none"
            placeholder="Your message..."
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center">
              Send Message <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
