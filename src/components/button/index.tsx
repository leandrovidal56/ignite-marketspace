import { Button as ButtonNativeBase, IButtonProps, Icon, Row, Text  } from "native-base"
import {  AntDesign  } from '@expo/vector-icons'

type Props = IButtonProps &{
    title: string;
    variant?: 'solid' | 'outline';
    iconLeftName?: string;
    iconRightName?: string;
    iconColor?: string;
    iconFamily?: object;
    textColor?: string;
    textSize?: number;
    textWeight?: string;
}

export function Button({
    title, iconLeftName, 
    iconRightName, iconColor, 
    variant = 'solid', iconFamily, 
    textColor = '#F7F7F8', 
    textSize = 14,textWeight, ...rest
    }: Props){

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
                {iconLeftName
                ?
                <Icon
                    as={iconFamily ? iconFamily : AntDesign}
                    name={iconLeftName}
                    color={iconColor}
                    size={4}
                    mr={2}
                />
                : ''}
                <Text
                    color={variant === 'outline' ? '#3E3A40' :textColor}
                    fontFamily="heading"
                    fontSize={textSize}
                    fontWeight={textWeight}
                >
                    {title}
                </Text>
                {iconRightName
                ?
                <Icon
                    as={AntDesign}
                    name={iconRightName}
                    color={iconColor}
                    size={4}
                    ml={2}
                />
                : ''}
            </Row>
        </ButtonNativeBase>
    )
}