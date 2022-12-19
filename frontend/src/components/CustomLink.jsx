import React from 'react';
import { Link } from 'react-router-dom';

function CustomLink({to,children}) {
  return (
      <Link to={to} className="text-dark-subtle hover:text-white">
        {children}
      </Link>
  );
}

export default CustomLink;