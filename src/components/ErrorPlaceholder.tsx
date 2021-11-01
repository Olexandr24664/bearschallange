function ErrorPlaceholder({ error }: { error: string }): JSX.Element {
  return <div className="text-red-500">{error}</div>
}

export default ErrorPlaceholder
