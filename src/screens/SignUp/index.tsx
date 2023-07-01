import { Center, Heading, Text, VStack, ScrollView, useToast} from 'native-base';

import LogoSvg from '@assets/LogoSmall.svg'
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller} from 'react-hook-form';
import { api } from '../../services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react';
import { AppError } from '../../utils/AppError';
import { UserPhoto } from '../../components/Profile';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { Alert } from 'react-native';
import axios from 'axios';

type FormDataProps = {
    name: string;
    email: string;
    tel: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.').default(''),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido').default(''),
    tel: yup.string().required('Informe o telefone.').default(''),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 caracteres' ).default(''),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere').default('')
})

export default function SignUp (){
    const [ isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState('');
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const toast = useToast()
    const { control, handleSubmit, formState: {errors}, reset } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });
    
    async function handleSignUp({ name, email, tel, password }: FormDataProps) {
        if(!avatar){
            return Alert.alert("Please fill image ")
        }

        try{
            console.log(avatar,'avatar')
            const data = new FormData()
            data.append('name', name)
            data.append('email', email)
            data.append('tel', tel)
            data.append('avatar',{
                uri: avatar,
                type: 'image/jpeg',
                name: 'avatar'
            });

            data.append('password', password)
            
            const response = await api.post('/users',  data, 
            {
                headers: { "Content-Type": "multipart/form-data"}
            }
            );
            if(response.status === 200 || 201){
                reset()
                navigation.navigate('home')
            }
        }
        catch(error){

            // if(axios.isAxiosError(error)){
            //     console.log(error.response?.data)
            // }

            setIsLoading(false);
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.' 

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }
    
    
    function handleGoToLogin(){
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} >
            <VStack flex={1}  color="#EDECEE" mb={10} px={10}>
                    <Center my={8}>
                        <LogoSvg/>
                        <Heading mt={5}>Boas vindas!</Heading>
                        <Text color='#5F5B62' >Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
                    </Center>
                    <Center mb={4}>
                        <UserPhoto 
                            setImage={setAvatar}
                            image={avatar}
                        />
                        <Controller
                            control={control}
                            name="name"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder='Nome'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />
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
                            name="tel"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder='Telefone'
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
                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder='Confirmar senha'
                                    secureTextEntry
                                    autoCapitalize='none'
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType='send'
                                    errorMessage={errors.password_confirm?.message}
                                />
                            )}
                        />
                        <Button
                            title='Criar'
                            mt={8}
                            mb={16}
                            background="#1A181B"
                            onPress={handleSubmit(handleSignUp)}
                        />
                        <Text mt={3} color='#3E3A40'>Já tem uma conta?</Text>
                        <Button
                            title='Ir para o login'
                            mt={4}
                            variant='outline'
                            onPress={handleGoToLogin}
                        />
                    </Center>
            </VStack>
        </ScrollView>
    );
}