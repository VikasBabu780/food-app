import {z} from "zod";

export const UserSignUpSchema = z.object({
    fullname:z.string().min(1,"Fullname is required"),
    email:z.string().email("Invalid Email Id"),
    contact:z.string().min(10,"Enter valid Contact number"),
    password:z.string().min(6,"Password must be at least of 6 characters")
})

export type SignupInputState = z.infer<typeof UserSignUpSchema>


export const UserLoginSchema = z.object({
    email:z.string().email("Invalid Email Id"),
    password:z.string().min(6,"Password must be at least of 6 characters")
})

export type LoginInputState = z.infer<typeof UserLoginSchema>