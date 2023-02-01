import styled from 'styled-components';
import {
  color,
  layout,
  flexbox,
  space,
  typography,
  border,
  position,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  SpaceProps,
  TypographyProps,
  BorderProps,
  PositionProps,
} from 'styled-system';

interface Props
  extends ColorProps,
    PositionProps,
    LayoutProps,
    FlexboxProps,
    SpaceProps,
    TypographyProps,
    BorderProps {
  children: React.ReactNode;
}

export const Box = styled('div')<Props>(
  color,
  flexbox,
  layout,
  space,
  typography,
  border,
  position
);
