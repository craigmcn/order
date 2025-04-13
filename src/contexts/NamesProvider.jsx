import { useState } from 'react';
import PropTypes from 'prop-types';
import { NamesContext } from './NamesContext';

const NamesProvider = ({ children }) => {
  const [currentNames, setCurrentNames] = useState(null);

  return <NamesContext.Provider value={{ currentNames, setCurrentNames }}>{children}</NamesContext.Provider>;
};

NamesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NamesProvider;
