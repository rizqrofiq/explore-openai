import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    model: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const results = await fetch(`${process.env.API_URL}/models`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`
        }
    }).then(response => response.json())

    const models = results.data.filter((model: any) => model.id.startsWith('text') && (!model.id.includes("similarity") && !model.id.includes("search") ))
    res.json({
        model: models
    })
}