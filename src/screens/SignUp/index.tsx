import { Center, Heading, Text, VStack, ScrollView} from 'native-base';

import LogoSvg from '@assets/LogoSmall.svg'
import Profile  from '@assets/Profile.svg'
import { Input } from '../../components/input';
import { Button } from '../../components/button';
export default function SignUp (){
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} >
            <VStack flex={1}  color="#EDECEE" mb={10} px={10}>
                    <Center my={8}>
                        <LogoSvg/>
                        <Heading mt={5}>Boas vindas!</Heading>
                        <Text color='#5F5B62' >Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
                    </Center>
                    <Center mb={4}>
                        <Profile/>
                        <Input 
                            placeholder='Nome'
                            secureTextEntry
                        />
                        <Input 
                            placeholder='E-mail' 
                            keyboardType='email-address' 
                            autoCapitalize='none'
                        />
                        <Input 
                            placeholder='Telefone'
                            secureTextEntry
                        />
                        <Input 
                            placeholder='Senha'
                            secureTextEntry
                        />
                        <Input 
                            placeholder='Confirmar senha'
                            secureTextEntry
                        />
                        <Button
                            title='Criar'
                            mt={8}
                            mb={16}
                            background="#1A181B"
                        />
                        <Text mt={3} color='#3E3A40'>Já tem uma conta?</Text>
                        <Button
                            title='Ir para o login'
                            mt={4}
                            variant='outline'
                        />
                    </Center>
            </VStack>
        </ScrollView>
    );
}