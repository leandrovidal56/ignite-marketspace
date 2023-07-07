import { Image, IImageProps, useToast } from "native-base";
import { Button as ButtonNativeBase  } from "native-base"
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../../hookes/useAuth";
import { api } from "../../services/api";

type Props = IImageProps & {
    setImage:  React.Dispatch<React.SetStateAction<{}>>
    image?: string
    size?: number   
}

export function UserPhoto({ setImage, image, size, ...rest}: Props){
    const [avatar, setAvatar] = useState('https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png')
    const toast = useToast()
    const { user } = useAuth()
    const pickImage = async () => {
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 0.1,
                allowsEditing: true,
            });

            if(result.canceled){
                console.log('CANCELADO')
                return
            }

            if(result.assets[0].uri){
                console.log('aquii')
                const photoInfo = await FileSystem.getInfoAsync(result.assets[0].uri)

                if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5){
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
                const fileExtension = result.assets[0].uri.split('.').pop()
                console.log(fileExtension, 'take file extension')

                const photoFile = {
                    name : `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: result.assets[0].uri,
                    type: `${result.assets[0].type}/${fileExtension}`
                } as any

                console.log(photoFile, 'take photofile' )
                setImage(photoFile)
                setAvatar(photoFile.uri)
            }

        } catch(err){
            console.log(err)
        }
      };

      async function getAvatar(){
        try{

        }catch(error){
            console.log(error, 'error response 1')

        }
      }
      
      useEffect(() => {
      }, [image])
      console.log(avatar, 'get avatar')

    return (
        <ButtonNativeBase 
            size={size || 20}
            borderRadius={50}
            onPress={pickImage}
        >
            <Image
                size={size || 20}
                borderRadius={50}
                source={{ uri: user.avatar ? `${api.defaults.baseURL}/images/${user.avatar}` : avatar } }
                {...rest}
                alt="Image de Perfil"
            />
        </ButtonNativeBase>
    )
}