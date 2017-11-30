import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

const ActiveLink = ({ children, router, exact, as, ...props }) => {
  const active = exact ? router.asPath === as : router.asPath.startsWith(as)
  return (
    <Link as={as} {...props}>
      {React.cloneElement(children, {
        className: `${children.props.className}${active ? ' active' : ''}`
      })}
    </Link>
  )
}

export default withRouter(ActiveLink)
