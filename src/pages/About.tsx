export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 p-8">
      <div className="w-full max-w-4xl rounded-3xl bg-gray-900 p-12 shadow-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-100">
          About Study League
        </h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-200">
              What is Study League?
            </h2>
            <p className="text-lg leading-relaxed">
              Study League is a productivity application designed to help
              students and professionals maximize their focus and learning
              efficiency. Built on the proven Pomodoro Technique, our timer
              helps you break work into manageable intervals with regular
              breaks.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-200">
              Features
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="mr-3 text-blue-400">•</span>
                <span>
                  Customizable timer durations for work and break sessions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-400">•</span>
                <span>
                  Visual progress indicators with beautiful circular progress
                  rings
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-400">•</span>
                <span>
                  Clean, distraction-free interface designed for focus
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-400">•</span>
                <span>Configurable notifications and sound alerts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-400">•</span>
                <span>Responsive design that works on all devices</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-200">
              The Pomodoro Technique
            </h2>
            <p className="mb-4 text-lg leading-relaxed">
              The Pomodoro Technique was developed by Francesco Cirillo in the
              late 1980s. It uses a timer to break down work into intervals,
              traditionally 25 minutes in length, separated by short breaks.
            </p>
            <p className="text-lg leading-relaxed">
              This method has been proven to improve focus, reduce mental
              fatigue, and boost productivity by creating a sense of urgency and
              providing regular mental rest periods.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-200">
              Getting Started
            </h2>
            <ol className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-blue-400">1.</span>
                <span>Choose your study topic and eliminate distractions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-blue-400">2.</span>
                <span>Start the timer and work with full focus</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-blue-400">3.</span>
                <span>Take a short break when the timer completes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-semibold text-blue-400">4.</span>
                <span>
                  Repeat the cycle and take longer breaks every 4 sessions
                </span>
              </li>
            </ol>
          </section>

          <section className="pt-8 text-center">
            <p className="text-lg text-gray-400">
              Version 1.0.0 • Built with React and TypeScript
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
