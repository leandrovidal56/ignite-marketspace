import { Center, Heading, Text, VStack, ScrollView} from 'native-base';

import LogoSvg from '@assets/Logo.svg'
import { Input } from '../../components/input';
import { Button } from '../../components/button';
export default function SignIn (){
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} >
            <VStack flex={1}  color="#f7f7f8">
                <VStack bg='#EDECEE' px={10} rounded='xl'>
                    <Center my={24}>
                        <LogoSvg/>
                        <Heading mt={7}>Marketspace</Heading>
                        <Text color='#5F5B62' >Seu espaço de compra e venda</Text>
                    </Center>
                    <Center>
                        <Text>Acesse sua conta</Text>
                        <Input 
                            placeholder='E-mail' 
                            keyboardType='email-address' 
                            autoCapitalize='none'
                        />
                        <Input 
                            placeholder='Senha'
                            secureTextEntry
                        />
                        <Button
                            title='Entrar'
                            mt={8}
                            mb={16}
                        />
                    </Center>
                </VStack>
                <VStack px={10}>
                    <Center>
                        <Text mt={12} color='#3E3A40'>Ainda não tem acesso?</Text>
                        <Button
                            title='Criar uma conta'
                            mt={4}
                            variant='outline'
                        />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    );
}