import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';
import React from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        bgColor="pGray.900"
        w="auto"
        my="auto"
        p={0}
        maxW={900}
      >
        <ModalBody
          p={0}
        >
          <Image
            maxW={900}
            maxH={600}
            src={imgUrl}
          />
        </ModalBody>
        <ModalFooter
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          p={2}
        >
          <Link
            href={imgUrl}
            target="_blank"
          >Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
