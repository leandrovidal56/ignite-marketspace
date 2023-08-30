import { Input as NativeBaseInput, type IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null
}

export function Input ({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
        <FormControl isInvalid={invalid}>
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
                isInvalid={invalid}
                _invalid={{
                  borderWidth: 1,
                  borderColor: 'red.500'
                }}

                _focus={{
                  bg: '#F7F7F8',
                  borderWidth: 1,
                  borderColor: '#647AC7'
                }}
                {...rest}
            />
            <FormControl.ErrorMessage _text={{ color: 'red.500' }} >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
  )
}
