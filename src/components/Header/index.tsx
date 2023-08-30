import { useNavigation } from '@react-navigation/native'
import { Button, Row, Text } from 'native-base'

import { useProduct } from '../../hooks/useProduct'
import { IconComponent } from '../icon'

interface Props {
  back?: boolean
  clearImages?: boolean
  title?: string
  showIconRight?: boolean
  iconLeftName?: 'edit' | 'plus'
  navigationIconRight?: () => void

}

export function Header ({
  back = false, title,
  iconLeftName = 'edit',
  showIconRight = false, navigationIconRight,
  clearImages

}: Props) {
  const navigation = useNavigation()
  const { image, setImage } = useProduct()

  async function handleGoBack () {
    if (clearImages) {
      await setImage([])
      navigation.goBack()
    }

    navigation.goBack()
  }

  return (
        <Row width={'full'} paddingX={6}
            height={12} alignItems={'center'} justifyContent={'center'}>
            {back
              ? <Button left={4} position={'absolute'} background={'transparent'} onPress={handleGoBack}
                    leftIcon={ <IconComponent name="arrowleft" color={'black'} size={6} />}
                />
              : ''
            }
            <Text textAlign={'center'} fontSize={20} fontWeight={'bold'}>{title}</Text>
            {showIconRight
              ? <Button right={0} position={'absolute'} background={'transparent'} onPress={navigationIconRight}
                    rightIcon={
                        <IconComponent name={iconLeftName} color={'black'} size={6} />}
                />
              : ''
            }
        </Row>
  )
}
