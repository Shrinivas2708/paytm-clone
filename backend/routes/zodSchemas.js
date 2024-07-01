const z = require("zod")
const signupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8).max(20),
    firstName: z.string(),
    lastName: z.string()
})
const signinSchema =  z.object({
    username: z.string().email(),
    password: z.string().min(8).max(20)
 
})
const updateSchema = z.object({
    password:z.string().min(8).max(20),
    firstName: z.string(),
    lastName: z.string()
})

module.exports ={
    signupSchema,
    signinSchema,
    updateSchema
 
}