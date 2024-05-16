import { Center, Image } from '@mantine/core';
import errorImage from '../assets/error.webp';

export const ErrorPage = () => {
  return (
    <Center>
      <Image src={errorImage} radius='md' maw={600} />
    </Center>
  );
};
