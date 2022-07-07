import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'It\'s working' })
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

        console.log(list.films)

        const result = []

        list.films.forEach(i => {
            result.push({
                id: i.filmId,
                name: i.nameRu,
                rating: i.rating,
                poster: i.posterUrl,
                description: i.description
            })
        })

        // const result = [
        //     { name: 'Форсаж', rating: 8, poster: 'https://i.pinimg.com/originals/5f/17/5f/5f175fb6572aff90ca340b715c06e579.jpg', description:'Пристегните ремни — гонка продолжается. Гавана, Берлин, Нью-Йорк — для самой крутой команды в мире нет ничего невозможного, пока они вместе. Но когда на их пути окажется одна из самых красивых женщин на планете и по совместительству королева киберпреступности, дороги друзей разойдутся.' },
        //     { name: 'Форсаж-2', rating: 8, poster: 'https://i.pinimg.com/originals/5f/17/5f/5f175fb6572aff90ca340b715c06e579.jpg', description:'Пристегните ремни — гонка продолжается. Гавана, Берлин, Нью-Йорк — для самой крутой команды в мире нет ничего невозможного, пока они вместе. Но когда на их пути окажется одна из самых красивых женщин на планете и по совместительству королева киберпреступности, дороги друзей разойдутся.' },
        //     { name: 'Форсаж-3', rating: 2, poster: 'https://i.pinimg.com/originals/5f/17/5f/5f175fb6572aff90ca340b715c06e579.jpg', description:'Пристегните ремни — гонка продолжается. Гавана, Берлин, Нью-Йорк — для самой крутой команды в мире нет ничего невозможного, пока они вместе. Но когда на их пути окажется одна из самых красивых женщин на планете и по совместительству королева киберпреступности, дороги друзей разойдутся.' },
        //     { name: 'Форсаж-4', rating: 7, poster: 'https://i.pinimg.com/originals/5f/17/5f/5f175fb6572aff90ca340b715c06e579.jpg', description:'Пристегните ремни — гонка продолжается. Гавана, Берлин, Нью-Йорк — для самой крутой команды в мире нет ничего невозможного, пока они вместе. Но когда на их пути окажется одна из самых красивых женщин на планете и по совместительству королева киберпреступности, дороги друзей разойдутся.' },
        // ]

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

app.get('/film', async (req, res) => {
    let id = req.query.id
    try {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
            headers: {
                'X-API-KEY': '4b403f23-526e-4a28-8173-2c724b350b9a',
                accept: 'application/json'
            }
        })
        const film = await response.json()
        console.log(film)

        const result = [{
            name: film.nameRu,
            description: film.description,
            rating: film.ratingImdb,
            date: film.year
        }]

        return res.json(result)
    }
    catch (err) {
        console.log(err)
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