
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SafeStructuredDataProps {
  children: React.ReactNode;
}

const SafeStructuredData: React.FC<SafeStructuredDataProps> = ({ children }) => {
  try {
    return <Helmet>{children}</Helmet>;
  } catch (error) {
    console.warn('SEO Structured Data error:', error);
    return null;
  }
};

export default SafeStructuredData;
