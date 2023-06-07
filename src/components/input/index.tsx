import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
    return (
        <NativeBaseInput
            bg='#F7F7F8'
            h={12}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="black"
            fontFamily="body"
            mt={4}
            placeholderTextColor="#9F9BA1"
            _focus={{
                bg: '#F7F7F8',
                borderWidth: 1,
                borderColor: '#647AC7'
            }}
            {...rest}
        />
    )
}