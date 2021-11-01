import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { PropsClassname } from '../types'

export type Breadcrumb = {
  to?: string
  name: string
}

type BreadcrumbsProps = {
  breadcrumbs?: Breadcrumb[]
} & PropsClassname

function Arrow(): JSX.Element {
  return <span className="inline-block mx-2">{'>'}</span>
}

function Item({
  breadcrumb,
  isLast,
}: {
  breadcrumb: Breadcrumb
  isLast: boolean
}): JSX.Element {
  const { to, name } = breadcrumb

  return (
    <>
      {to ? (
        <Link to={to} className="hover:underline">
          {name}
        </Link>
      ) : (
        <span>{name}</span>
      )}
      {!isLast && <Arrow />}
    </>
  )
}

function Breadcrumbs({
  breadcrumbs,
  className,
}: BreadcrumbsProps): JSX.Element | null {
  function renderItems() {
    if (!breadcrumbs || breadcrumbs.length < 1) {
      return null
    }

    return breadcrumbs.map((breadcrumb, index) => {
      const isLast = index === breadcrumbs.length - 1

      return <Item key={index} breadcrumb={breadcrumb} isLast={isLast} />
    })
  }

  return (
    <div className={classnames('flex flex-wrap', className)}>
      {renderItems()}
    </div>
  )
}

export default React.memo(Breadcrumbs)
