import z from "zod"

const UserSchema = z.object({
    mail: z.string().endsWith('@epn.edu.ec',{
        error: "El correo debe ser institucional"
    })
})

export function ValitionUser(object){
    return UserSchema.safeParse(object)
}