import { Icon } from '@iconify/react'

function Hero() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2">
      <img
        alt="Students studying together"
        className="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-800/80 via-orange-700/60 to-transparent"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="mb-6 text-5xl leading-tight font-bold">
            Welcome to Study League
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-white/90">
            Join thousands of students in focused study sessions. Track your
            progress, stay motivated, and achieve your academic goals together.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon className="text-2xl" icon="material-symbols:group" />
              <span className="font-medium">50k+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon className="text-2xl" icon="material-symbols:timer" />
              <span className="font-medium">1M+ Study Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
