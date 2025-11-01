import { Icon } from '@iconify/react'
import clsx from 'clsx'

const TYPE = {
  ERROR: {
    icon: 'material-symbols:error',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-600'
  },
  INFO: {
    icon: 'material-symbols:info',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600'
  }
}

function MessageBox({
  type = 'INFO',
  title,
  className,
  children
}: {
  type?: keyof typeof TYPE
  title?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        `rounded-lg border p-4`,
        TYPE[type].bgColor,
        TYPE[type].borderColor,
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <Icon
          className={clsx(TYPE[type].iconColor, 'shrink-0')}
          icon={TYPE[type].icon}
        />
        <span className={clsx('text-sm font-medium', TYPE[type].textColor)}>
          {title}
        </span>
      </div>
      {children && (
        <div className={clsx('mt-2 text-left text-sm', TYPE[type].textColor)}>
          {children}
        </div>
      )}
    </div>
  )
}

export default MessageBox
