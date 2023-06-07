import { Button as ButtonNativeBase, IButtonProps, Icon, Row, Text  } from "native-base"
import {  AntDesign  } from '@expo/vector-icons'

type Props = IButtonProps &{
    title: string;
    variant?: 'solid' | 'outline';
    iconName?: string;
    iconColor?: string;
}

export function Button({title, iconName, iconColor, variant = 'solid', ...rest}: Props){
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
            <Row alignItems={'center'} justifyContent={'space-between'}>
                {iconName
                ?
                <Icon
                    as={AntDesign}
                    name={iconName}
                    color={iconColor}
                    size={4}
                    mr={2}
                />
                : ''}
                <Text
                    color={variant === 'outline' ? '#3E3A40' :"#F7F7F8"}
                    fontFamily="heading"
                    fontSize="sm"
                >
                    {title}
                </Text>
            </Row>
        </ButtonNativeBase>

    )
}