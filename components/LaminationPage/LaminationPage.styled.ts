import styled from 'styled-components';
import { Modal } from 'antd';

type TContentStep = {
  contentStep: number;
};

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 190px;
`;
export const ProfileSelectWrapper = styled.div<TContentStep>`
  position: absolute;

  width: 100%;
  transform: ${p =>
    p.contentStep > 1 ? 'translateX(-100%)' : 'translateX(0%)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 1s ease-in-out;
`;
export const TableWrapper = styled.div<TContentStep>`
  position: absolute;

  width: 100%;
  transform: ${p =>
    p.contentStep > 1 ? 'translateX(0%)' : 'translateX(100%)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 1s ease-in-out;
`;

export const StyledLabel = styled.span`
  display: inline-block;
  width: 100px;
`;
