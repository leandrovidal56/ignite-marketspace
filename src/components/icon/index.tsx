import {  Icon, IIconProps  } from "native-base"
import {  AntDesign  } from '@expo/vector-icons'

type Props = IIconProps & {
    name?: string;
    color?: string;
    size?: number;
    mr?: number
    ml?: number
    mt?: number
    mb?: number
}

export function IconComponent({name, color, size, mr, ml, mt, mb, ...rest}: Props){
    return (
        <Icon 
            as={AntDesign}
            name={name}
            color={color}
            size={size}
            mr={mr}
            ml={ml}
            mt={mt}
            mb={mb}
            {...rest}
        />
    )
}