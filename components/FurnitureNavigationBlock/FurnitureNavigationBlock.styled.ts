import Link from 'next/link';
import styled from 'styled-components';

type TProps = {
  isActive: boolean;
};

export const StyledLink = styled(Link)<TProps>`
  margin-left: 10px;
  border-bottom: ${props =>
    props.isActive
      ? '3px solid var(--accent-color)'
      : '3px solid rgba(2, 140, 255, 0.13)'};
  transition: border-color 0.3s ease;
  color: ${props => (props.isActive ? 'var(--accent-color)' : 'black')};
`;
