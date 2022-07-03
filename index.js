import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'It\'s working' })
})

app.get('/find', async (req, res) => {
    let name = req.query.name
    name = decodeURI(name)
    try {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}`, {
            headers: {
                'X-API-KEY': '4b403f23-526e-4a28-8173-2c724b350b9a',
                accept: 'application/json'
            }
        })
        const list = await response.json()


        const result = []

        list.films.forEach(i => {
            result.push({
                name: i.nameRu,
                rating: i.rating,
                poster: i.posterUrl,
            })
        })
        if (result.length > 0) {
            return res.json(result)
        }
        else {
            return res.json('Ничего не найдено')
        }
    }
    catch (err) {
        console.log('-------')
        console.log(err)
        return res.status(500).json('Ошибка')
    }
})


async function start() {
    try {
        app.listen(5000, () => {
            console.log(`[APP HAS BEEN STARTED ON PORT 5000]`)
        })
    }
    catch (err) {
        console.log('[SERVER ERROR]', err.message)
        process.exit(1)
    }
}

start()