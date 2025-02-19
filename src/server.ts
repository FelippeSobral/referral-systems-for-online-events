import fastify from "fastify";
import {fastifyCors} from '@fastify/cors'
import {validatorCompiler, // Validar os dados 
        serializerCompiler,
        ZodTypeProvider// Transformar os dados quando estiver enviando para o front-end
} from 'fastify-type-provider-zod'
import {z} from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    origin: true,
} );

app.post('/subscription', {
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email(),
        })
    }
}, (request, reply) => {
   const { name , email } = request.body

   return reply.status(201).send({
    name,
    email,
   }) 

});

app.listen({port: 4040}).then(() => {
    console.log("Http server running")
});