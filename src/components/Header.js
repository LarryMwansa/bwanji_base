'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <div className={styles.logoContainer}>
              <Image 
                src="/logo.svg" 
                alt="Bwanji Digital" 
                className={styles.logoImage}
                width={120}
                height={40}
              />
              <span className={styles.logoFallback}>Bwanji Digital</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link href="/https://bwanji.digital" className={styles.navLink}>
              Bwanji Digital
            </Link>
            <Link href="/qr-code" className={styles.navLink}>
              QR Code Generator
            </Link>
            <Link href="/social-formatter" className={styles.navLink}>
              Social Media Post Formatter
            </Link>
            <Link href="/resources" className={styles.navLink}>
              Resources
            </Link>
            {/* <Link href="/register" className={styles.getStartedBtn}>
              Get Started
            </Link> */}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className={styles.hamburgerIcon}>
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerLineActive : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            <div className={styles.mobileOverlay} onClick={closeMenu}></div>
            <div className={styles.mobileMenu}>
              <nav className={styles.mobileNav}>
                <Link href="/services" className={styles.mobileNavLink} onClick={closeMenu}>
                  Services
                </Link>
                <Link href="/about" className={styles.mobileNavLink} onClick={closeMenu}>
                  About
                </Link>
                <Link href="/resources" className={styles.mobileNavLink} onClick={closeMenu}>
                  Resources
                </Link>
                <Link href="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
                  Contact
                </Link>
                <Link href="/register" className={styles.mobileGetStartedBtn} onClick={closeMenu}>
                  Get Started
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
