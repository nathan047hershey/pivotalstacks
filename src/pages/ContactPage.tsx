import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Clock, MessageCircle, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const offices = [
  {
    city: 'San Francisco',
    country: 'United States',
    address: '123 Innovation Drive, CA 94102',
    phone: '+1 (800) 555-0000',
    email: 'support@pivotalstacks.com',
    image: 'https://images.pexels.com/photos/1488230/pexels-photo-1488230.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    address: '100 Tech Street, EC2A 4NE',
    phone: '+44 20 7123 4567',
    email: 'london@pivotalstacks.com',
    image: 'https://images.pexels.com/photos-460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: 'Marina Bay, Singapore 018989',
    phone: '+65 6789 0123',
    email: 'singapore@pivotalstacks.com',
    image: 'https://images.pexels.com/photos/954696/pexels-photo-954696.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    city: 'Sydney',
    country: 'Australia',
    address: 'Circular Quay, NSW 2000',
    phone: '+61 2 9876 5432',
    email: 'sydney@pivotalstacks.com',
    image: 'https://images.pexels.com/photos/3293187/pexels-photo-3293187.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
          project_type: formData.projectType,
          budget: formData.budget,
        });

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: '',
        budget: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-950 dark:to-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-main relative z-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-1.5 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              GET IN TOUCH
            </span>
            <h1 className="heading-display text-gray-900 dark:text-white mb-6">
              Let's Build
              <br />
              <span className="text-gradient">Something Great</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-dark-300 max-w-xl">
              Ready to transform your business with innovative technology? Our team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-900">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
                Start a Conversation
              </span>
              <h2 className="heading-section text-gray-900 dark:text-white mb-6">
                Tell Us About Your Project
              </h2>
              <div className="line-accent mb-8" />
              <p className="text-gray-600 dark:text-dark-400 mb-8 max-w-lg">
                Fill out the form below and our team will get back to you within 24 hours to discuss your vision.
              </p>

              {isSubmitted ? (
                <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 border border-primary-500/20 dark:border-primary-500/30 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-dark-400 mb-6">
                    Thank you for reaching out. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Select a type</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile App</option>
                        <option value="ai">AI Solutions</option>
                        <option value="cloud">Cloud Services</option>
                        <option value="design">UI/UX Design</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Select budget</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-50k">$15,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-plus">$100,000+</option>
                        <option value="undisclosed">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Tell us about your project, timeline, and specific requirements..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-700 dark:text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-8 sticky top-24">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
                  Direct Contact
                </span>
                <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-6">
                  Reach Out Directly
                </h2>

                <div className="space-y-6 mb-8">
                  <a href="mailto:support@pivotalstacks.com" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 transition-colors">
                      <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="block text-gray-900 dark:text-white font-medium mb-1">Email</span>
                      <span className="text-gray-600 dark:text-dark-400 text-sm">support@pivotalstacks.com</span>
                    </div>
                  </a>

                  <a href="tel:+18005550000" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 transition-colors">
                      <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="block text-gray-900 dark:text-white font-medium mb-1">Phone</span>
                      <span className="text-gray-600 dark:text-dark-400 text-sm">+1 (800) 555-0000</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <span className="block text-gray-900 dark:text-white font-medium mb-1">Headquarters</span>
                      <span className="text-gray-600 dark:text-dark-400 text-sm">
                        123 Innovation Drive<br />
                        San Francisco, CA 94102
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-700 pt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-500" />
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-dark-400">Monday - Friday</span>
                      <span className="text-gray-900 dark:text-white font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-dark-400">Saturday</span>
                      <span className="text-gray-900 dark:text-white font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-dark-400">Sunday</span>
                      <span className="text-gray-500 dark:text-dark-500">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-400">
                    <Users className="w-4 h-4" />
                    <span>Average response time: 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Worldwide Presence
            </span>
            <h2 className="heading-lg text-gray-900 dark:text-white mb-6">Our Global Offices</h2>
            <div className="line-accent-center mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="card p-6 group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src={office.image}
                    alt={`${office.city} office`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  {office.city}
                </h3>
                <span className="text-gray-500 dark:text-dark-500 text-sm block mb-3">
                  {office.country}
                </span>
                <address className="not-italic text-gray-600 dark:text-dark-400 text-sm space-y-1">
                  <p className="text-xs">{office.address}</p>
                  <p>
                    <a href={`tel:${office.phone}`} className="hover:text-primary-500 transition-colors text-xs">
                      {office.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${office.email}`} className="hover:text-primary-500 transition-colors text-xs">
                      {office.email}
                    </a>
                  </p>
                </address>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}