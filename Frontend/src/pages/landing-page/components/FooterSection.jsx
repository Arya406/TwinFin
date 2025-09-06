import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Blog', href: '#blog' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' }
    ],
    social: [
      { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
      { name: 'Facebook', icon: 'Facebook', href: '#facebook' },
      { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
      { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' }
    ]
  };

  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/landing-page" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold">Face Twin Finder</span>
            </Link>
            
            <p className="text-gray-300 max-w-md leading-relaxed">
              Discover your facial twins from around the world using advanced AI technology. Connect, chat, and build meaningful relationships with your lookalikes globally.
            </p>
            
            <div className="flex space-x-4">
              {footerLinks?.social?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={20} color="currentColor" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-300">
                © {currentYear} Face Twin Finder. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-sm text-gray-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} color="var(--color-accent)" />
                <span className="text-sm text-gray-300">ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;