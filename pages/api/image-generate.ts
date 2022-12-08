import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configOpenAI = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY
})

const openai = new OpenAIApi(configOpenAI)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await openai.createImage({
            prompt: req.body.prompt,
            n: 1,
            size: req.body.size
        }) 
    
        const imageUrl = response.data.data[0].url
        res.status(200).json({
            imageUrl
        })
    } catch(err: any) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}