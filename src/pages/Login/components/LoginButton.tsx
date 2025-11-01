import { Icon } from '@iconify/react'

function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      className="group relative flex w-full justify-center rounded-lg border border-transparent bg-orange-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isLoading}
      type="submit"
    >
      <div className="flex items-center space-x-2">
        <Icon
          className="size-5"
          icon={isLoading ? 'svg-spinners:180-ring' : 'material-symbols:login'}
        />
        <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
      </div>
    </button>
  )
}

export default LoginButton
