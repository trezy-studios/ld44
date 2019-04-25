// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'





const Footer = () => (
  <footer>
    <div className="phone">
      <a href="tel:+12702102618">
        <FontAwesomeIcon
          fixedWidth
          icon="phone" />
        &nbsp;
        +1 (555) 555-5555
      </a>
    </div>

    <div className="email">
      <a href="mailto:hello@example.com">
        <FontAwesomeIcon
          fixedWidth
          icon="envelope" />
        &nbsp;
        hello@example.com
      </a>
    </div>

    <hr />

    <small>&copy; 1970 - {(new Date).getFullYear()} Example.com</small>
  </footer>
)





export { Footer }
