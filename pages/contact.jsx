import Layout from '@/components/Layout';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Using Formspree for form submission (free tier)
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
    
    // For now, we'll simulate submission and show success message
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Layout 
      title="Contact"
      description="Get in touch with Jeet Desai for consulting, architecture reviews, or collaboration opportunities."
    >
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h1>
          <p className="text-xl text-gray-100">
            Have a project in mind or want to discuss architectural challenges? I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                  <a href="mailto:jeetdesai32800@gmail.com" className="text-gray-700 hover:text-primary transition">
                    jeetdesai32800@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
                  <a href="tel:+919033590775" className="text-gray-700 hover:text-primary transition">
                    +91-9033590775
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
                  <p className="text-gray-700">
                    Gandhinagar, Gujarat, India<br />
                    <span className="text-sm text-gray-600">Available for US travel (B1 Visa)</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Connect On</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://linkedin.com/in/jeethdesai" 
                      className="inline-flex items-center justify-center w-12 h-12 bg-light rounded-full hover:bg-primary hover:text-white transition"
                      title="LinkedIn"
                    >
                      in
                    </a>
                    <a 
                      href="https://github.com/jeetdesai" 
                      className="inline-flex items-center justify-center w-12 h-12 bg-light rounded-full hover:bg-primary hover:text-white transition"
                      title="GitHub"
                    >
                      gh
                    </a>
                    <a 
                      href="mailto:jeetdesai32800@gmail.com" 
                      className="inline-flex items-center justify-center w-12 h-12 bg-light rounded-full hover:bg-primary hover:text-white transition"
                      title="Email"
                    >
                      ✉
                    </a>
                  </div>
                </div>

                <div className="bg-light p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-gray-700 text-sm">
                    I typically respond to inquiries within 24 hours. For urgent matters, please call directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Message Sent!</h3>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                      placeholder="Tell me about your project or challenge..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    I respect your privacy. Your information will only be used to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'What services do you offer?',
                a: 'I provide consulting on AI-augmented engineering, system architecture design, database optimization, security audits, and full-stack Rails development. I also conduct architectural reviews and help teams implement DevOps practices.',
              },
              {
                q: 'Do you take on full-time roles?',
                a: 'Yes, I\'m open to full-time opportunities for the right project. I\'m also available for consulting engagements, part-time contracts, and short-term projects.',
              },
              {
                q: 'What\'s your typical project timeline?',
                a: 'It depends on the scope. Small consulting engagements typically take 2-4 weeks. System architecture reviews can be completed in 1-2 weeks. Larger projects are tailored based on requirements.',
              },
              {
                q: 'Do you work with remote teams?',
                a: 'Absolutely. I\'ve worked with distributed teams across multiple time zones. I\'m also available for on-site work (US B1 Visa holder).',
              },
              {
                q: 'What\'s your approach to new projects?',
                a: 'I start with a deep discovery phase to understand your challenges, goals, and constraints. Then I propose an architectural approach with clear trade-offs, timelines, and expected outcomes.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white p-6 rounded-lg cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-primary">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
