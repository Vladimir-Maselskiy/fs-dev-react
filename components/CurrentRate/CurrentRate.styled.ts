import styled from 'styled-components';

export const StyledCurrentRate = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const StyledSpanRate = styled.div<{
  isRateRefreshed: boolean;
}>`
  font-size: 24px;
  color: ${p =>
    p.isRateRefreshed ? '#000000' : 'var(--grey-color)'};
`;
