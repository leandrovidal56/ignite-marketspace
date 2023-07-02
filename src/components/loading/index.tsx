import { Center, Spinner } from 'native-base';

export function Loading() {
  return (
    <Center flex={1} bg="#EDECEE">
      <Spinner color="#647AC7"  />
    </Center>
  );
}