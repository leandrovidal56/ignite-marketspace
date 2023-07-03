// export type UserDTO = {
//     refresh_token: string,
//     token: string,
//     id: string,
//     avatar: string,
//     name: string,
//     email: string,
//     tel: string
//     password: string,
    
// }
export type UserTokenDTO = {
    refresh_token: string,
    token: string,
    user: {
        id: string,
        avatar: string,
        name: string,
        email: string,
        tel: string
        password: string,
    }
}