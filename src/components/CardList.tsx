import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSelected, setImageSelected] = useState('')

  const handleViewImage = (img) => {
    setImageSelected(img)
    setIsVisible(true)
  }

  return (
    <>
      <SimpleGrid
        columns={3}
        spacing={10}
      >
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isVisible}
        onClose={() => setIsVisible(false)}
        imgUrl={imageSelected}
      />
    </>
  );
}
