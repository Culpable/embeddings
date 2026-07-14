import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

const iconMotion = {
  initial: {
    opacity: 0,
    scale: 0.25,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 0.25,
    filter: 'blur(4px)',
  },
}

const iconTransition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0,
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

export function NavigationButton({
  panelId,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
  className,
}) {
  const Icon = expanded ? XIcon : MenuIcon

  return (
    <button
      ref={toggleRef}
      type="button"
      onClick={onToggle}
      aria-expanded={expanded ? 'true' : 'false'}
      aria-controls={panelId}
      className={clsx(
        className,
        'group -m-2.5 rounded-full p-2.5 transition-[transform,background-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 active:scale-[0.96]',
        invert
          ? 'hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-neutral-950'
          : 'hover:bg-neutral-950/10',
      )}
      aria-label={expanded ? 'Close navigation' : 'Open navigation'}
    >
      <span className="relative block h-6 w-6">
        <AnimatePresence initial={false}>
          <motion.span
            key={expanded ? 'close' : 'menu'}
            className="absolute inset-0"
            variants={iconMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={iconTransition}
          >
            <Icon
              className={clsx(
                'h-6 w-6 transition-[fill] duration-200',
                invert
                  ? 'fill-white group-hover:fill-neutral-200'
                  : 'fill-neutral-950 group-hover:fill-neutral-700',
              )}
            />
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  )
}
