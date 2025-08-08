import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
      <main>
          NavBar
          {children}
          Footer
    </main>
  )
}

export default RootLayout