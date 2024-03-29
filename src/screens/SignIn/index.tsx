import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Text, VStack, ScrollView, useToast} from 'native-base';

import { useAuth } from '../../hooks/useAuth';
import { AppError } from '../../utils/AppError';
import { AuthNavigatorRoutesProps } from '../../routes/auth.routes';

import LogoSvg from '@assets/Logo.svg'
import { Input } from '../../components/input';
import { Button } from '../../components/button';

type FormDataProps = {
    email: string;
    password: string;
}

const signIpSchema = yup.object({
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 caracteres' ),
})


export default function SignIn (){
    const { control, handleSubmit, formState: {errors}, reset  } = useForm<FormDataProps>({
        resolver: yupResolver(signIpSchema)
    });

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const { signIn } = useAuth()
    const toast = useToast()
    
    const [loading, setIsLoading] = useState(false)

    function handleNewAccount(){
        navigation.navigate('signUp')
    }

    async function handleLogin({ email, password}: FormDataProps){
        try{
            setIsLoading(true)
            await signIn(email, password)
            reset()

        }catch(error){
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível acessar a sua conta. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally{
            setIsLoading(false)
        }
    }

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
                        <Controller
                            control={control}
                            name="email"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder='E-mail'
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                          <Controller
                            control={control}
                            name="password"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder='Senha'
                                    secureTextEntry
                                    autoCapitalize='none'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />
                        <Button
                            title='Entrar'
                            mt={8}
                            mb={16}
                            onPress={handleSubmit(handleLogin)}
                            isLoading={loading}
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
                            onPress={handleNewAccount}
                        />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    );
}