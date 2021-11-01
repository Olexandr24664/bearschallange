import React from 'react'
import Header from '../components/Header'
import Breadcrumbs, { Breadcrumb } from '../components/Breadcrumbs'

type WithHeaderProps = {
  children: React.ReactNode
  breadcrumbs: Breadcrumb[]
}

function WithHeader({ children, breadcrumbs }: WithHeaderProps): JSX.Element {
  return (
    <>
      <Header />
      <Breadcrumbs breadcrumbs={breadcrumbs} className="container mx-auto" />
      <main className="container mx-auto">{children}</main>
    </>
  )
}

export default WithHeader
