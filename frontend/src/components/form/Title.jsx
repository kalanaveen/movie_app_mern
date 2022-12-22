import React from 'react'

function Title({children}) {
  return (
    <h1 className="text-xl dark:text-white text-seondary font-semibold text-center">
    {children}
  </h1>
  )
}

export default Title
