import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  description = 'UI/UX Designer & Full-Stack Developer Portfolio',
}) => {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <>
      <Helmet>
        <title>{`${title} | Portfolio`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen pt-20 bg-secondary-50 dark:bg-dark-800 text-dark-800 dark:text-white"
      >
        {children}
      </motion.main>
    </>
  );
};

export default PageContainer;