import { Avatar, Box, Button as ButtonNativeBase, IButtonProps, Image, Row, Text  } from "native-base"

type Props = IButtonProps &{
    title: string;
    type: 'usado' | 'novo';
    price: number;
    status?: 'disable' | 'active';
    imageAdress: string;
    altImage: string;
}

export function BoxSale({title, type, price, status = 'active', imageAdress, altImage, ...rest}: Props){
    return (
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
                    <Text textAlign={'right'}>{type}</Text>
                </Row>
            <Text>{title}</Text>
            <Text>R$ {price}</Text>
        </Box>
    )
}