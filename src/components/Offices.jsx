import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong
        className={clsx(
          'font-semibold',
          invert ? 'text-white' : 'text-neutral-950'
        )}
      >
        {name}
      </strong>
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <div {...props}>
      <Office name="perth" invert={invert} />
      <Office name="melbourne" invert={invert} />
    </div>
  )
}
