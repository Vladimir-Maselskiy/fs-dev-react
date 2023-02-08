import { StyledControlButton } from './СontrolButtons.styled';
import IconOptions from '../../img/options.svg';
import IconTypeOfWindow from '../../img/type-of-window.svg';
import IconMacoLogo from '../../img/maco-logo.svg';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Box } from '../Box/Box';

type TProps = {
  isOptitionButtonDisabled: boolean;
};

export const ControlButtons = ({
  isOptitionButtonDisabled,
}: TProps) => {
  return (
    <Box display="flex" flexDirection="column">
      <StyledControlButton type="button">
        <IconMacoLogo width={32} height={32} />
      </StyledControlButton>
      <StyledControlButton
        type="button"
        disabled={isOptitionButtonDisabled}
      >
        <IconOptions />
      </StyledControlButton>
      <StyledControlButton type="button">
        <IconTypeOfWindow />
      </StyledControlButton>
      <StyledControlButton type="button">
        <RiDeleteBin2Line size={32} />
      </StyledControlButton>
    </Box>
  );
};
