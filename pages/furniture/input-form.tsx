import { FInputPage } from '@/components/FInputPage/FInputPage';
import { FurnitureContainer } from '@/components/FurnitureContainer/FurnitureContainer';
import { MainContainer } from '@/components/MainContainer/MainContainer';

export default function Home() {
  return (
    <MainContainer>
      <FurnitureContainer>
        <FInputPage />
      </FurnitureContainer>
    </MainContainer>
  );
}
