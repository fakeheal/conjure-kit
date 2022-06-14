// @flow
import { Navbar as FlowbiteNav } from 'flowbite-react';
import { useMatch } from 'react-router-dom'

const Navbar = () : React$Element<any> => {
  let match = useMatch({ path: new URL(window.location.href).pathname, end: true });
  return (
    <FlowbiteNav className="border-b border-gray-200 sm:!px-0">
      <FlowbiteNav.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Conjure Kit
          </span>
      </FlowbiteNav.Brand>
      <FlowbiteNav.Toggle />
      <FlowbiteNav.Collapse>
        <FlowbiteNav.Link href="/integrations" active={match.pathname === '/integrations'}>
          Integrations
        </FlowbiteNav.Link>
        <FlowbiteNav.Link href="/about" active={match.pathname === '/about'}>
          About
        </FlowbiteNav.Link>
      </FlowbiteNav.Collapse>
    </FlowbiteNav>
  )
}

export default Navbar;
