import { Button as ButtonNativeBase, IButtonProps, Text  } from "native-base"

type Props = IButtonProps &{
    title: string;
    variant?: 'solid' | 'outline';
}

export function Button({title, variant = 'solid', ...rest}: Props){
    return (
        <ButtonNativeBase 
            w="full"
            h={12}
            bg={variant === 'outline' ? "#D9D8DA": "#647AC7"}
            rounded='sm'
            _pressed={{
                bg: variant === 'outline' ? '#EDECEE' : '#364D9D'
            }}
            {...rest}
        >
            <Text
                color={variant === 'outline' ? '#3E3A40' :"#F7F7F8"}
                fontFamily="heading"
                fontSize="sm"
            >
                {title}
            </Text>
        </ButtonNativeBase>

    )
}