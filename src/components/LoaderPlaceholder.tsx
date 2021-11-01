function LoaderPlaceholder({
  text = 'Loading...',
}: {
  text?: string
}): JSX.Element {
  return <div>{text}</div>
}

export default LoaderPlaceholder
