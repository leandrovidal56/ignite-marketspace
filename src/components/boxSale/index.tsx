import { Avatar, Box, Button as ButtonNativeBase, IButtonProps, Image, Row, Text  } from "native-base"

type Props = IButtonProps &{
    title: string;
    type: 'usado' | 'novo';
    price: number;
    status?: 'disable' | 'active';
    imageAdress: string;
    altImage: string;
    onPress?: () => void;
}

export function BoxSale({title, type, price, status = 'active', imageAdress, altImage, onPress, ...rest}: Props){
    return (
        <ButtonNativeBase backgroundColor={'transparent'} onPress={onPress} {...rest}>
            <Box width={153} height={143} mb={6}>
                    <Image 
                        source={{
                            uri: imageAdress
                        }}
                        width={153}
                        height={100}
                        alt="foto"
                        borderRadius={6}
                        />
                    <Row justifyContent={'space-between'} padding={1} position={'absolute'} width={153}>
                        <Avatar size={8} />
                        <Box width={50} height={17} background={ (type === 'novo') ?  '#364D9D' : '#3E3A40'} borderRadius={8} justifyContent={'center'} alignItems={'center'} >
                            <Text fontSize={10} lineHeight={13} textTransform={'uppercase'} fontWeight={'bold'} color={'white'}>
                                {type}
                            </Text>
                        </Box>
                    </Row>
                <Text>{title}</Text>
                <Text>R$ {price}</Text>
            </Box>
        </ButtonNativeBase>
        
    )
}