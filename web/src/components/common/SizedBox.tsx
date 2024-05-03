import React from 'react';
import styled from 'styled-components';

interface SizedBoxProps {
  height: string;
}

const SizedBoxContainer = styled.div<SizedBoxProps>`
  width: 100%;
  height: ${({ height }) => height};
`;

const SizedBox: React.FC<SizedBoxProps> = ({ height }) => {
  return (
    <SizedBoxContainer height={height} />
  );
};

export default SizedBox;
