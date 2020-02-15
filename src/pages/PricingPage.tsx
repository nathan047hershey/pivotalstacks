import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and startups',
    price: '499',
    features: [
      'Up to 5 pages website',
      'Responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      '30 days support',
      '1 revision round',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses',
    price: '1,499',
    features: [
      'Up to 15 pages website',
      'Custom UI/UX design',
      'Advanced SEO optimization',
      'CMS Integration',
      'Analytics setup',
      '90 days support',
      '3 revision rounds',
      'Performance optimization',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Full-scale solutions for large organizations',
    price: '4,999',
    features: [
      'Unlimited pages',
      'Custom web application',
      'API development',
      'Third-party integrations',
      'Security audit',
      '1 year support',
      'Unlimited revisions',
      'Priority support',
      'Dedicated account manager',
    ],
    popular: false,
  },
];

const resumePlans = [
  {
    name: 'Free',
    price: '0',
    description: 'Basic resume building',
    features: ['3 templates', 'PDF download', 'Basic ATS check'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '9.99',
    period: '/month',
    description: 'Professional features',
    features: [
      'All templates',
      'AI optimization',
      'Cover letter builder',
      'Multiple formats',
      'Priority support',
    ],
    popular: true,
  },
];

export function PricingPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Pricing</span>
            </h1>
            <p className="animate-fade-in-up text-lg text-dark-300" style={{ animationDelay: '100ms' }}>
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Web Development Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Web Development Services</h2>
            <p className="text-dark-400">Custom solutions tailored to your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative animate-fade-in-up bg-dark-900 border rounded-2xl p-8 ${
                  plan.popular ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-dark-800'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white text-sm font-medium flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" /> Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-dark-500 text-sm">$</span>
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-dark-400 ml-2">starting</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-dark-300">
                      <Check className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90'
                      : 'bg-dark-800 text-white hover:bg-dark-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Builder Pricing */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Resume Builder</h2>
            <p className="text-dark-400">Create professional resumes that get you hired</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resumePlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-dark-900 border rounded-2xl p-8 ${
                  plan.popular ? 'border-primary-500' : 'border-dark-800'
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-dark-500 text-sm">$</span>
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-dark-400 ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-dark-400 text-sm mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-dark-300">
                      <Check className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services/resume-builder"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90'
                      : 'bg-dark-800 text-white hover:bg-dark-700'
                  }`}
                >
                  Try Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What is included in the support period?', a: 'Support includes bug fixes, minor updates, and technical assistance. Major feature additions may require a separate agreement.' },
              { q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade at any time. We will prorate the difference based on your remaining support period.' },
              { q: 'Do you offer custom solutions?', a: 'Yes, contact us for enterprise and custom project pricing tailored to your specific requirements.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for larger projects.' },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-dark-900 border border-dark-800 rounded-xl p-6 cursor-pointer">
                <summary className="flex items-center justify-between text-white font-medium list-none">
                  {faq.q}
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="text-dark-400 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
