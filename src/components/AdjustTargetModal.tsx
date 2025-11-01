import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'

interface AdjustTargetModalProps {
  isOpen: boolean
  onClose: () => void
  currentTargets?: {
    daily: number
    weekly: number
    monthly: number
  }
  onSave: (targets: { daily: number; weekly: number; monthly: number }) => void
}

const presets = [
  { name: 'Light', daily: 1, weekly: 7, monthly: 30, description: '~30 mins/day' },
  { name: 'Moderate', daily: 2, weekly: 14, monthly: 60, description: '~2 hours/day' },
  { name: 'Focused', daily: 4, weekly: 28, monthly: 120, description: '~4 hours/day' },
  { name: 'Intensive', daily: 6, weekly: 42, monthly: 180, description: '~6 hours/day' },
  { name: 'Extreme', daily: 8, weekly: 56, monthly: 240, description: '~8 hours/day' }
]

export default function AdjustTargetModal({ isOpen, onClose, currentTargets, onSave }: AdjustTargetModalProps) {
  const [dailyTarget, setDailyTarget] = useState(currentTargets?.daily || 2)
  const [weeklyTarget, setWeeklyTarget] = useState(currentTargets?.weekly || 14)
  const [monthlyTarget, setMonthlyTarget] = useState(currentTargets?.monthly || 60)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (currentTargets) {
      setDailyTarget(currentTargets.daily)
      setWeeklyTarget(currentTargets.weekly)
      setMonthlyTarget(currentTargets.monthly)
    }
  }, [currentTargets])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const applyPreset = (preset: typeof presets[0]) => {
    setDailyTarget(preset.daily)
    setWeeklyTarget(preset.weekly)
    setMonthlyTarget(preset.monthly)
  }

  const handleSave = () => {
    onSave({
      daily: dailyTarget,
      weekly: weeklyTarget,
      monthly: monthlyTarget
    })
    onClose()
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative max-h-[90vh] w-full max-w-2xl transform overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
          isAnimating
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Adjust Your Study Targets</h1>
            <p className="mt-1 text-sm text-gray-500">Set your daily, weekly, and monthly study goals</p>
          </div>
          <button
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            onClick={onClose}
          >
            <Icon className="text-xl" icon="material-symbols:close" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8 p-6">
          {/* Presets */}
          <div>
            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <Icon
                className="mr-2 text-indigo-600"
                icon="material-symbols:bolt"
              />
              Quick Presets
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  className="flex flex-col items-center rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-indigo-600 hover:bg-indigo-50"
                  onClick={() => applyPreset(preset)}
                >
                  <span className="mb-1 text-sm font-semibold text-gray-900">{preset.name}</span>
                  <span className="text-xs text-gray-500">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Targets */}
          <div>
            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
              <Icon
                className="mr-2 text-indigo-600"
                icon="material-symbols:tune"
              />
              Custom Targets (hours)
            </h2>
            <div className="space-y-4">
              {/* Daily Target */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>Daily Target</span>
                  <span className="text-indigo-600">{dailyTarget}h ({dailyTarget * 60} mins)</span>
                </label>
                <input
                  className="w-full"
                  max="12"
                  min="0"
                  step="0.5"
                  type="range"
                  value={dailyTarget}
                  onChange={(e) => setDailyTarget(parseFloat(e.target.value))}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>0h</span>
                  <span>6h</span>
                  <span>12h</span>
                </div>
              </div>

              {/* Weekly Target */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>Weekly Target</span>
                  <span className="text-indigo-600">{weeklyTarget}h</span>
                </label>
                <input
                  className="w-full"
                  max="84"
                  min="0"
                  step="1"
                  type="range"
                  value={weeklyTarget}
                  onChange={(e) => setWeeklyTarget(parseInt(e.target.value))}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>0h</span>
                  <span>42h</span>
                  <span>84h</span>
                </div>
              </div>

              {/* Monthly Target */}
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>Monthly Target</span>
                  <span className="text-indigo-600">{monthlyTarget}h</span>
                </label>
                <input
                  className="w-full"
                  max="360"
                  min="0"
                  step="5"
                  type="range"
                  value={monthlyTarget}
                  onChange={(e) => setMonthlyTarget(parseInt(e.target.value))}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>0h</span>
                  <span>180h</span>
                  <span>360h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-lg bg-indigo-50 p-4">
            <h3 className="mb-3 flex items-center text-sm font-semibold text-indigo-900">
              <Icon className="mr-2" icon="material-symbols:analytics" />
              Your Target Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">{dailyTarget}h</div>
                <div className="text-xs text-indigo-700">Per Day</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">{weeklyTarget}h</div>
                <div className="text-xs text-indigo-700">Per Week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">{monthlyTarget}h</div>
                <div className="text-xs text-indigo-700">Per Month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
          <button
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
            onClick={handleSave}
          >
            <Icon icon="material-symbols:save" />
            <span>Save Targets</span>
          </button>
        </div>
      </div>
    </div>
  )
}
