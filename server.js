//import { createServer } from 'node:http'


 //const server = createServer( (request, response) => { //request info da requisição, response e a resposta easy.
   // response.write('oi')

 //   return response.end()
//})

 //server.listen(3333) //basicamente a porta que vamos acessar


 import { fastify } from "fastify";
 import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

 const server = fastify()
 //const database = new DatabaseMemory()
 const database = new DatabasePostgres()

//rotas crud
//posso criar varias rotas com fastify



server.post('/videos', async (request,reply) => {

    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    console.log(database.show())
    return reply.status(201).send()
})



server.get('/videos', async () => {
    const videos = await database.show()

    return videos
})


server.put('/videos/:id', async (request,reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

        await database.delete(videoId);
        return reply.status(204).send();
        
        console.log("erro")
});




 server.listen({
    port: 3333,
 })


