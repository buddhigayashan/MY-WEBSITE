import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  Check,
  AlertCircle,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import PageContainer from '../components/Layout/PageContainer';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
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
        formRef.current.reset();

        setTimeout(() => setSubmissionStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {submissionStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <p>Your message has been sent successfully!</p>
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>There was an error sending your message. Try again later.</p>
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={5}
            className="mt-1 w-full p-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Your message..."
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      content: '+94 717 071 306',
      href: 'tel:+94717071306',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      content: 'buddhigjayawickrama@gmail.com',
      href: 'mailto:buddhigjayawickrama@gmail.com',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6 text-white" />,
      name: 'GitHub',
      href: 'https://github.com/buddhigayashan',
      bgColor: 'bg-gray-800 dark:bg-gray-700',
      hoverColor: 'hover:bg-black dark:hover:bg-gray-900',
    },
    {
      icon: <Linkedin className="h-6 w-6 text-white" />,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/buddhi-jayawickrama-a82007366/',
      bgColor: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#084D92]',
    },
    {
      icon: <Instagram className="h-6 w-6 text-white" />,
      name: 'Instagram',
      href: 'https://www.instagram.com/_b_u_d_d_h_i___g_a_y_a_s_h_a_n/',
      bgColor: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
      hoverColor: 'hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
    },
    {
      icon: <Facebook className="h-6 w-6 text-white" />,
      name: 'Facebook',
      href: 'https://www.facebook.com/buddhi.jayawickrama/',
      bgColor: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#145CBF]',
    },
  ];

  return (
    <PageContainer
      title="Contact"
      description="Get in touch with me regarding your project or collaboration opportunities"
    >
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1A2A44] to-[#4A5B7C] dark:from-[#0D1B2A] dark:to-[#2A3B5A] text-white transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Get In Touch
            </h1>
            <motion.div
              className="w-28 h-1.5 bg-teal-300 mx-auto mb-6 rounded-full opacity-90"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transformOrigin: 'center' }}
            />
            <p className="text-base sm:text-xl text-gray-200 font-medium">
              Have a project in mind or want to collaborate? I'd love to hear
              from you. Feel free to reach out using the form below or through
              my social media channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-10 sm:space-y-12 p-6 sm:p-8 bg-gray-700 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-600"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 * index,
                      }}
                      className="flex items-center group transform transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <div className="mr-4 p-3 bg-teal-300/30 rounded-full text-teal-300 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-0.5">
                          {item.title}
                        </h3>
                        <a
                          href={item.href}
                          className="text-gray-200 hover:text-teal-300 transition-colors duration-300"
                        >
                          {item.content}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Connect With Me
                </h2>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {socialLinks.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + index * 0.1,
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                      className={`p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${item.bgColor} ${item.hoverColor}`}
                      aria-label={item.name}
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="p-6 sm:p-8 bg-[#2A3B5A] rounded-xl shadow-lg border border-gray-600"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default ContactPage;
