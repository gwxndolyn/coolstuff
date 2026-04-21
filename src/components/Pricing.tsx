interface Plan {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for side projects and personal use.',
    features: ['5 projects', 'Basic analytics', 'Community support', '1 GB storage'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'For teams that need more power and flexibility.',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '50 GB storage',
      'Custom domains',
      'Team collaboration',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    description: 'For large organisations with complex requirements.',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'SLA guarantee',
      'Unlimited storage',
      'SSO / SAML',
      'Audit logs',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col gap-6 ${
                plan.highlighted
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105'
                  : 'bg-white border border-gray-100'
              }`}
            >
              <div>
                <p className={`text-sm font-semibold uppercase tracking-widest mb-1 ${plan.highlighted ? 'text-indigo-200' : 'text-indigo-600'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  {plan.price !== 'Free' && (
                    <span className={`text-sm mb-1 ${plan.highlighted ? 'text-indigo-200' : 'text-gray-400'}`}>/mo</span>
                  )}
                </div>
                <p className={`text-sm mt-2 ${plan.highlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-indigo-200' : 'text-indigo-500'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlighted ? 'text-indigo-50' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-auto rounded-xl px-6 py-3 text-sm font-semibold text-center transition-all ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
