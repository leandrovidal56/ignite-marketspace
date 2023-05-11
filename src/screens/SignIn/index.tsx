import { Center, Heading, Input, Text, VStack} from 'native-base';

import LogoSvg from '@assets/Logo.svg'
export default function SignIn (){
    return (
        <VStack flex={1}>
            <Center my={24}>
                <LogoSvg/>
                <Heading mt={7}>Marketspace</Heading>
                <Text>Seu espaço de compra e venda</Text>
            </Center>
            <Center>
                <Text>Acesse sua conta</Text>
                <Input placeholder='E-mail'/>
                <Input placeholder='Senha'/>
            </Center>
        </VStack>
    );
}