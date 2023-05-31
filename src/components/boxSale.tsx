import { Avatar, Box, Button as ButtonNativeBase, IButtonProps, Row, Text  } from "native-base"

type Props = IButtonProps &{
    title: string;
    type: 'usado' | 'novo';
    price: number;
    status?: 'disable' | 'active';
}

export function BoxSale({title, type, price, status = 'active', ...rest}: Props){
    return (
        <Box width={153} height={143} mb={6}>
            <Box background={'blue.400'} width={153} height={100}>
                <Row justifyContent={'space-between'} padding={1}>
                    <Avatar size={8} />
                    <Text textAlign={'right'}>{type}</Text>
                </Row>
            </Box>
            <Text>{title}</Text>
            <Text>R$ {price}</Text>
        </Box>
    )
}