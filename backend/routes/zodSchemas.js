const z = require("zod")
const signupSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})
const signinSchema =  z.object({
    username: z.string().email(),
    password: z.string()
 
})
const updateSchema = z.object({
    password:z.string(),
    firstName: z.string(),
    lastName: z.string()
})

module.exports ={
    signupSchema,
    signinSchema,
    updateSchema
 
}