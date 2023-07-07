import { Image, IImageProps, useToast } from "native-base";
import { Button as ButtonNativeBase  } from "native-base"
import { useState } from "react";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../../hookes/useAuth";
import { IconComponent } from "../icon";

type Props = IImageProps & {
    setImage:  React.Dispatch<React.SetStateAction<string[]>>
    show?: boolean
}

export function AdvertPhoto({ show, setImage,  ...rest}: Props){
    const [advertPhoto, setAdvertPhoto] = useState('')
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
                const photoInfo = await FileSystem.getInfoAsync(result.assets[0].uri)

                if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5){
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
                const fileExtension = result.assets[0].uri.split('.').pop()

                const photoFile = {
                    name : `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: result.assets[0].uri,
                    type: `${result.assets[0].type}/${fileExtension}`
                } as any

                setImage( prevState => [...prevState, result.assets[0].uri])
                setAdvertPhoto(photoFile.uri)
            }

        } catch(err){
            console.log(err)
        }
      };
      
    
    return (
        <ButtonNativeBase 
            size={100}
            borderRadius={6}
            onPress={pickImage}
            mr={2}
            background={'#D9D8DA'}
        >
            {!advertPhoto ?
            <IconComponent  name="plus" size={5} />
            :
             <Image
                size={100}
                borderRadius={6}
                source={{ uri: advertPhoto }}
                background={'#D9D8DA'}
                {...rest}
                
                alt="Image de Perfil"
            /> 
            }
        </ButtonNativeBase>
    )
}