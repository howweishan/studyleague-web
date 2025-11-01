import { Icon } from '@iconify/react'

export default function Achievements() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-100 p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Main Icon */}
        <div className="relative mb-8">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-r from-orange-400 to-orange-600 shadow-2xl">
            <Icon
              className="text-6xl text-white"
              icon="material-symbols:trophy"
            />
          </div>

          {/* Floating Achievement Badges */}
          <div className="absolute -top-4 -left-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-linear-to-r from-yellow-400 to-yellow-600 shadow-lg">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:star"
            />
          </div>
          <div
            className="absolute -top-2 -right-6 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-linear-to-r from-purple-400 to-purple-600 shadow-lg"
            style={{ animationDelay: '0.5s' }}
          >
            <Icon
              className="text-xl text-white"
              icon="material-symbols:military-tech"
            />
          </div>
          <div
            className="absolute -bottom-2 -left-6 flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-linear-to-r from-green-400 to-green-600 shadow-lg"
            style={{ animationDelay: '1s' }}
          >
            <Icon
              className="text-xl text-white"
              icon="material-symbols:workspace-premium"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8 rounded-2xl border border-orange-100 bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            🏆 Achievements
          </h1>
          <p className="mb-6 text-xl text-gray-600">
            Your journey to greatness starts here
          </p>

          {/* Coming Soon Badge */}
          <div className="mb-6 inline-flex items-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-lg font-semibold text-white shadow-lg">
            <Icon
              className="mr-3 text-2xl"
              icon="material-symbols:rocket-launch"
            />
            Coming Soon
          </div>

          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            We&apos;re crafting an amazing achievement system that will
            recognize your dedication, celebrate your milestones, and unlock
            exciting rewards as you progress in your studies.
          </p>

          {/* Preview Features */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:timer"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Study Streaks
              </h3>
              <p className="text-sm text-gray-600">
                Track consecutive days of studying and unlock streak
                achievements
              </p>
            </div>

            <div className="rounded-xl border border-yellow-200 bg-linear-to-br from-yellow-50 to-yellow-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:target"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Study Goals</h3>
              <p className="text-sm text-gray-600">
                Complete daily, weekly, and monthly study goals
              </p>
            </div>

            <div className="rounded-xl border border-purple-200 bg-linear-to-br from-purple-50 to-purple-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:leaderboard"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Leaderboard Ranks
              </h3>
              <p className="text-sm text-gray-600">
                Earn badges for reaching top positions in the leaderboard
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-linear-to-br from-green-50 to-green-100 p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                <Icon
                  className="text-2xl text-white"
                  icon="material-symbols:psychology"
                />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Focus Master</h3>
              <p className="text-sm text-gray-600">
                Unlock achievements for maintaining long focus sessions
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="rounded-xl border border-orange-100 bg-white p-6 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Development Progress
            </span>
            <span className="text-sm font-medium text-orange-600">10%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-linear-to-r from-orange-400 to-orange-600 transition-all duration-1000 ease-out"
              style={{ width: '10%' }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Achievement system in active development
          </p>
        </div>
      </div>
    </div>
  )
}
