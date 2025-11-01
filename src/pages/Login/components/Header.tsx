import { Icon } from '@iconify/react'

import MessageBox from '@/components/ui/MessageBox'

function Header() {
  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
          <Icon
            className="text-2xl text-white"
            icon="material-symbols:school"
          />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900">Study</h1>
          <h1 className="-mt-1 text-2xl font-bold text-orange-500">League</h1>
        </div>
      </div>
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-600">Please sign in to your account</p>
      </div>

      {/* Demo Credentials */}
      <MessageBox
        className="mt-12"
        title="Use This Demo Credentials"
        type="INFO"
      >
        <p>
          <strong>Email:</strong> demo@studyleague.com
        </p>
        <p>
          <strong>Password:</strong> demo1234
        </p>
      </MessageBox>
    </>
  )
}

export default Header
