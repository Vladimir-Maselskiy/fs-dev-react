import { StyledNextLink } from './NextLink.styled';

type TProps = {
  path: string;
  children: React.ReactNode;
};

export const NextLink = ({ path, children }: TProps) => {
  return <StyledNextLink href={path}>{children}</StyledNextLink>;
};
