import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const complete = await axios({
            url: `${process.env.API_URL}/completions`,
            method: 'post',
            data: {
                model: req.body.model,
                prompt: req.body.prompt
            },
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`
            }
        })

        const result = await complete.data
        res.send(result)
    } catch(err: unknown) {
        res.status(500).send(err)
    }
}