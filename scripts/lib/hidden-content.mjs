export function nodeAttributes(node) {
  return Object.fromEntries(
    (node.attrs ?? []).map(({ name, value }) => [name, value]),
  )
}

export function nodeIsHidden(node) {
  const attrs = nodeAttributes(node)
  const className = attrs.class ?? ''
  const inlineStyle = (attrs.style ?? '').replaceAll(/\s+/gu, '').toLowerCase()

  return (
    attrs.hidden !== undefined ||
    attrs.inert !== undefined ||
    attrs['aria-hidden'] === 'true' ||
    /(?:^|\s)(?:hidden|sr-only|invisible|opacity-0|scale-0)(?:\s|$)/u.test(
      className,
    ) ||
    /(?:^|\s)-(?:left|top|right|bottom)-(?:full|\[)/u.test(className) ||
    /(?:^|\s)(?:-?translate-[xy]-(?:full|\[)|clip-path-)/u.test(className) ||
    /(?:^|;)(?:display:none|visibility:(?:hidden|collapse)|opacity:0(?:[;}]|$)|clip:rect\(0(?:px)?,0(?:px)?,0(?:px)?,0(?:px)?\)|clip-path:inset\((?:50|100)%\))/u.test(
      inlineStyle,
    ) ||
    /transform:[^;]*translate(?:3d|x|y)?\([^)]*(?:999|100vw|100vh|-100vw|-100vh)/u.test(
      inlineStyle,
    )
  )
}
