import Fastify from 'fastify'
import cors from 'fastify-cors'
import fastifyMultipart from 'fastify-multipart'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import sharp from 'sharp'

const fastify = Fastify()

fastify.register(cors)
fastify.register(fastifyMultipart)

fastify.get('/', async (req, res) => {
  return { hello: 'world' }
})

fastify.post('/upload', async (req, reply) => {
  const data = await req.file()
  // const buffer = await data.toBuffer()

  await pipeline(data.file, createWriteStream(data.filename))

  reply.send()
})

const start = async () => {
  try {
    await fastify.listen(1010)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
