import { Icon } from '@iconify/react'
import React from 'react'

function Input({
  id,
  label,
  icon,
  value,
  setValue,
  ...InputProps
}: {
  id: string
  label: string
  icon: string
  value: string
  setValue: (value: string) => void
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'id' | 'value' | 'onChange' | 'className'
>) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-gray-700"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" icon={icon} />
        </div>
        <input
          className="w-full rounded-lg border border-gray-300 py-3 pr-3 pl-10 text-gray-900 placeholder-gray-500 transition-colors focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
          id={id}
          name={id}
          value={value}
          onChange={e => setValue(e.target.value)}
          {...InputProps}
        />
      </div>
    </div>
  )
}

export default Input
