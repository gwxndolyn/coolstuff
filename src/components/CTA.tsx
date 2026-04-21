export default function CTA() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-16 sm:px-16 text-center overflow-hidden">
          {/* Decorative blobs */}
          <div aria-hidden="true" className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full bg-purple-500/20 blur-2xl" />

          <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to start building?
          </h2>
          <p className="relative mt-4 text-indigo-100 text-lg max-w-xl mx-auto">
            Clone this template, install dependencies, and you're running locally in under a minute.
          </p>

          <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all hover:-translate-y-0.5"
            >
              Get started for free
            </a>
            <a
              href="#"
              className="w-full sm:w-auto rounded-xl border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Read the docs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
