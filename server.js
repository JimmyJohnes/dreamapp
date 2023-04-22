import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import  express, { response }  from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI,
})
const openai = new OpenAIApi(config);

app.post('/dream', async (req,res) => {
    try{
        const prompt = req.body.prompt;
        const aiResponse = await openai.createImage({prompt,n:1});
        const image = aiResponse.data.data[0].url;
        res.send({image})
    }
    catch(err){
        console.error(err);
        res.status(500).send(err?.response.data.error.message || "something went wrong");
    }
});

app.listen(3000, () => {console.log('listening on port 3000')});