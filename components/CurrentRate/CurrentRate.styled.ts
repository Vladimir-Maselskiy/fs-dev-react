import styled from 'styled-components';

export const StyledCurrentRate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;
export const StyledSpanRate = styled.div<{
  isRateRefreshed: boolean;
  isLoading: boolean;
}>`
  font-size: 24px;
  color: ${p => (p.isRateRefreshed ? '#000000' : 'var(--grey-color)')};
  color: ${p => (p.isLoading ? 'var(--grey-color)' : '#000000')};
`;
