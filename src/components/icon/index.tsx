import { AntDesign } from '@expo/vector-icons'
import { Icon, type IIconProps } from 'native-base'

type Props = IIconProps & {
  name?: string
  color?: string
  size?: number
  mr?: number
  ml?: number
  mt?: number
  mb?: number
  familyIcon?: Object
}

export function IconComponent ({ name, color, size, mr, ml, mt, mb, familyIcon, ...rest }: Props) {
  return (
        <Icon
            as={familyIcon ?? AntDesign}
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
