import { Navbar } from 'flowbite-react';
import { useMatch } from 'react-router-dom'

export default function () {
  let match = useMatch({ path: new URL(window.location.href).pathname, end: true });
  return (
    <Navbar className="border-b border-gray-200 sm:px-0">
      <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Conjure Kit
          </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/integrations" active={match.pathname === '/integrations'}>
          Integrations
        </Navbar.Link>
        <Navbar.Link href="/about" active={match.pathname === '/about'}>
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
