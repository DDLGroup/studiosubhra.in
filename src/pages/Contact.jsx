import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import ParallaxSection from '../components/ParallaxSection/ParallaxSection';
import SectionReveal from '../components/SectionReveal/SectionReveal';
import SEO from '../components/SEO/SEO';
import styles from './Contact.module.css';
import { sanitizeInput, isValidEmail, isValidPhone, isRateLimited } from '../utils/sanitize';
import { CONTACT } from '../utils/constants';

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://www.studiosubhra.in/contact#webpage',
      url: 'https://www.studiosubhra.in/contact',
      name: 'Contact Studio Subhra — Atelier Appointments & Bespoke Inquiries',
      description:
        'Connect with Studio Subhra atelier in Salt Lake, Kolkata for bespoke couture, denim sarees, bridal wear consultations, and price requests.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.studiosubhra.in/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: 'https://www.studiosubhra.in/contact',
          },
        ],
      },
      mainEntity: {
        '@type': 'ClothingStore',
        name: 'Studio Subhra Atelier',
        telephone: '+919903024696',
        email: 'subhraonly@yahoo.co.in',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Salt Lake',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          postalCode: '700091',
          addressCountry: 'IN',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How can I inquire about pricing or order a custom design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can reach Studio Subhra directly via WhatsApp at +91 98756 29283, call +91 99030 24696, or fill out the appointment inquiry form on our contact page. All collections operate on a bespoke "Price on Request" basis.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is the Studio Subhra atelier located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our atelier is located in Salt Lake, Kolkata, West Bengal, India. Atelier visits and fitting consultations are available by prior appointment.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Studio Subhra offer worldwide shipping for couture collections?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Studio Subhra caters to clients across India and internationally. Bespoke creations, Denim Sarees, and Designer Prêt garments are securely packaged and shipped worldwide.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who designs the collections at Studio Subhra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All creations are envisioned and crafted by founder Subhra Saha, a seasoned Fashion Designer, Design Lecturer, and Fashion Consultant based in Kolkata.',
          },
        },
      ],
    },
  ],
};

const PinterestIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.honeypot) return;
    
    if (typeof isRateLimited === 'function' && isRateLimited()) {
      setErrors({ form: 'Too many attempts. Please try again later.' });
      return;
    }

    const newErrors = {};
    const sName = typeof sanitizeInput === 'function' ? sanitizeInput(formData.name) : formData.name;
    const sEmail = typeof sanitizeInput === 'function' ? sanitizeInput(formData.email) : formData.email;
    const sPhone = typeof sanitizeInput === 'function' ? sanitizeInput(formData.phone) : formData.phone;
    const sMessage = typeof sanitizeInput === 'function' ? sanitizeInput(formData.message) : formData.message;

    if (!sName) newErrors.name = 'Name is required';
    if (!sEmail || (typeof isValidEmail === 'function' && !isValidEmail(sEmail))) newErrors.email = 'Valid email is required';
    if (sPhone && typeof isValidPhone === 'function' && !isValidPhone(sPhone)) newErrors.phone = 'Invalid phone format';
    if (!sMessage) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '', honeypot: '' });
    }, 1500);
  };

  return (
    <main className={styles.contactPage}>
      <SEO
        title="Contact Us — Atelier Appointments & Bespoke Inquiries"
        description="Book a consultation with Subhra Saha at Studio Subhra in Salt Lake, Kolkata. Inquire about bespoke bridal couture, denim sarees, and designer pret collections."
        canonical="https://www.studiosubhra.in/contact"
        schema={contactSchema}
      />
      {/* Hero Banner with editorial background for high-contrast navbar & title */}
      <ParallaxSection backgroundImage="/images/hero/slider2.jpg" height="55vh" overlayOpacity={0.65}>
        <div className={styles.heroOverlay}>
          <SectionReveal animation="fadeUp">
            <span className={styles.categoryLabel}>CONNECT WITH US</span>
            <h1 className={styles.title}>Get in Touch</h1>
            <div className={styles.dividerGold} />
            <p className={styles.subtitle}>We'd love to hear from you</p>
          </SectionReveal>
        </div>
      </ParallaxSection>

      <section className={styles.content}>
        <div className={styles.formContainer}>
          {submitSuccess && (
            <div className={styles.successMsg}>
              Thank you for reaching out! We'll get back to you soon.
            </div>
          )}
          {errors.form && <div className={styles.errorMsg} style={{position: 'relative', bottom: 0, marginBottom: '1rem'}}>{errors.form}</div>}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name="honeypot" className={styles.honeypot} value={formData.honeypot} onChange={handleChange} tabIndex="-1" autoComplete="off" />
            
            <div className={styles.formGroup} style={{ animationDelay: '0.1s' }}>
              <input type="text" name="name" placeholder="Your Name" className={styles.input} value={formData.name} onChange={handleChange} />
              {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>
            
            <div className={styles.formGroup} style={{ animationDelay: '0.2s' }}>
              <input type="email" name="email" placeholder="Your Email" className={styles.input} value={formData.email} onChange={handleChange} />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup} style={{ animationDelay: '0.3s' }}>
              <input type="tel" name="phone" placeholder="Your Phone (Optional)" className={styles.input} value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
            </div>
            
            <div className={styles.formGroup} style={{ animationDelay: '0.4s' }}>
              <select name="subject" className={styles.select} value={formData.subject} onChange={handleChange}>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Price Request">Price Request</option>
                <option value="Appointment">Appointment</option>
                <option value="Custom Design">Custom Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup} style={{ animationDelay: '0.5s' }}>
              <textarea name="message" placeholder="Your Message" className={styles.textarea} value={formData.message} onChange={handleChange} />
              {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
            </div>
            
            <div className={styles.formGroup} style={{ animationDelay: '0.6s' }}>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.infoColumn}>
          <img src="/images/logo.png" alt="Studio Subhra Logo" className={styles.logo} />
          
          <div className={styles.infoItem} style={{ animationDelay: '0.2s' }}>
            <Mail className={styles.infoIcon} size={24} />
            <span>{CONTACT?.email || 'subhraonly@yahoo.co.in'}</span>
          </div>
          
          <div className={styles.infoItem} style={{ animationDelay: '0.3s' }}>
            <Phone className={styles.infoIcon} size={24} />
            <span>{CONTACT?.phone || '+91 99030 24696'}</span>
          </div>
          
          <div className={styles.infoItem} style={{ animationDelay: '0.4s' }}>
            <MessageCircle className={styles.infoIcon} size={24} />
            <span>{CONTACT?.whatsapp || '+91 98756 29283'}</span>
          </div>
          
          <div className={styles.infoItem} style={{ animationDelay: '0.5s' }}>
            <MapPin className={styles.infoIcon} size={24} />
            <span>{CONTACT?.address || 'Studio Subhra, Salt Lake, Kolkata'}</span>
          </div>

          <div className={styles.social}>
            <a href={CONTACT?.social?.facebook || 'https://www.facebook.com/subhracoutureofficial'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook"><Facebook size={20} /></a>
            <a href={CONTACT?.social?.instagram || 'https://instagram.com/studiosubhra'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
            <a href={CONTACT?.social?.youtube || 'https://www.youtube.com/@subhra_saha'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Youtube"><Youtube size={20} /></a>
            <a href={CONTACT?.social?.pinterest || 'https://in.pinterest.com/subhra_saha/'} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Pinterest"><PinterestIcon size={18} /></a>
          </div>

          {/* Atelier QR Code & Shareable Poster */}
          <div className={styles.qrCard}>
            <div className={styles.qrImageWrapper}>
              <img
                src="/images/studio-subhra-qr.png"
                alt="Studio Subhra Official QR Code"
                className={styles.qrImage}
              />
            </div>
            <div className={styles.qrInfo}>
              <h4 className={styles.qrTitle}>Scan &amp; Share Studio Subhra</h4>
              <p className={styles.qrDesc}>Scan with your mobile camera or download our official luxury poster to share.</p>
              <a
                href="/images/studio-subhra-poster.png"
                download="Studio-Subhra-Official-Poster.png"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.qrDownloadBtn}
              >
                Download Atelier Poster
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
