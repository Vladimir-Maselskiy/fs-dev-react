import { FurnitureContainer } from '@/components/FurnitureContainer/FurnitureContainer';
import { MainContainer } from '@/components/MainContainer/MainContainer';
import { SavedOrders } from '@/components/SavedOrders/SavedOrders';

export default function MyOrders() {
  return (
    <MainContainer>
      <FurnitureContainer>
        <SavedOrders />
      </FurnitureContainer>
    </MainContainer>
  );
}
