import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <div className={styles.companyInfo}>
            <div className={styles.logo}>
              <Image 
                src="/logo.svg" 
                alt="Bwanji Digital" 
                className={styles.logoImage}
                width={120}
                height={40}
              />
            </div>
            <p className={styles.companyDescription}>
              Your complete digital partner for web design, development, and digital marketing solutions.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/LarryMwansa/bwanji_base" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://web.facebook.com/bwanjidigital" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://wa.me/+270688226285" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4>Services</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/services/custom-webapp" className={styles.footerLink}>Custom Web App</Link></li>
              <li><Link href="/services/mobile-app" className={styles.footerLink}>Mobile App</Link></li>
              <li><Link href="/services/devops-infrastructure" className={styles.footerLink}>DevOps & Infrastructure</Link></li>
              <li><Link href="/services/innovation-consulting" className={styles.footerLink}>Innovation Consulting</Link></li>
              <li><Link href="/services/startup-incubator" className={styles.footerLink}>Startup Incubator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerSection}>
            <h4>Company</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
              <li><Link href="/resources" className={styles.footerLink}>Resources</Link></li>
              <li><Link href="/startup-incubator" className={styles.footerLink}>Startup Incubator</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.footerSection}>
            <h4>Support</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/contact?subject=Help Request" className={styles.footerLink}>Help Center</Link></li>
              <li><Link href="/resources" className={styles.footerLink}>Resources</Link></li>
              <li><Link href="/contact?subject=Terms of Service" className={styles.footerLink}>Terms of Service</Link></li>
              <li><Link href="/contact?subject=Privacy Policy" className={styles.footerLink}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerDivider}>
          <p className={styles.copyright}>
            © 2025 Bwanji. All rights reserved. Building digital futures, one project at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
