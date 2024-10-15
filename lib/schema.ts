
import  { z } from "zod"

export const signUpSchema = z.object({
    name:z.string().trim().min(1,{
        message:"Name is required"
    }),
    email:z.string().email().trim().min(1,{
        message:"Email is required"
    }),
    password : z.string().trim().min(4,{
        message:'Password must be min 4 characters long'
    })
})

export const signInSchema = z.object({
    email: z.string().email().trim().min(1, {
        message: "Email is required"
    }),
    password: z.string().trim().min(4, {
        message: 'Password must be min 4 characters long'
    })
})