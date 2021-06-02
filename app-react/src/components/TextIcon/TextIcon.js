import React from 'react';

const TextIcon = ({ icon, text, description }) => (
  <h2 style={{ color: 'white' }}>
    <img alt={description} src={icon} /> {text}
  </h2>
);

export default TextIcon;
