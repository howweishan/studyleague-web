import { createContext, useContext } from 'react'

interface NavbarContextType {
  isOpen: boolean
  toggleNavbar: () => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function useNavbar() {
  const context = useContext(NavbarContext)

  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }

  return context
}

export default NavbarContext
