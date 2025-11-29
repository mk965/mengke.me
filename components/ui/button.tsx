import clsx from 'clsx'

export function Button({
  children,
  as: Component = 'button',
  className,
  ...rest
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  [key: string]: any
}) {
  return (
    <Component
      className={clsx([
        'border border-transparent',
        'bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500',
        'text-white hover:text-white dark:text-white dark:hover:text-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'transition-colors duration-150',
        'text-sm font-medium leading-5',
        'inline rounded-lg px-4 py-2 shadow',
        'inline-flex items-center gap-1 no-underline',
        className,
      ])}
      {...rest}
    >
      {children}
    </Component>
  )
}
