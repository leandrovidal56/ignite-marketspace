import { Center, Heading, Text, VStack, ScrollView, useToast} from 'native-base';

import LogoSvg from '@assets/LogoSmall.svg'
import Profile  from '@assets/Profile.svg'
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller} from 'react-hook-form';
import { api } from '../../services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react';
import { AppError } from '../../utils/AppError';
import * as ImagePicker from 'expo-image-picker';

type FormDataProps = {
    name: string;
    email: string;
    tel: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
    tel: yup.string().required('Informe o telefone.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 caracteres' ),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere')
})

export default function SignUp (){
    const [ isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState(['']);
    const navigation = useNavigation();
    const toast = useToast()
    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if(!result.canceled){
            await setAvatar(result.assets[0].uri)
        }
      };
    
    async function handleSignUp({ name, email, tel, password }: FormDataProps) {
        try{
            console.log(avatar,'avatar')
            await api.post('/users', {name, email,  tel, password, avatar });
        }
        catch(error){
            console.log('passou aqui55')
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
                        <Profile onPress={pickImage} />
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