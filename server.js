import express from 'express'
import postgres from 'postgres'
import pkg from 'pg'
const { Pool } = pkg
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors({ origin: '*' }))

dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;

const pool = new Pool({
connectionString: URL
})
app.use(express.json())
app.use(express.static("public"))

//get one
app.get("/", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM portfolio ORDER BY art_year DESC');
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

//Get all
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number.isInteger(id))) {
        req.status(400).send("Bad Request")
    } else {
        try {
            const result = await pool.query('SELECT art_name, art_year, art_type, about, image_url FROM portfolio WHERE art_id = $1', [id]);
            if (result.rowCount === '0') {
                res.status(404).send('Not Found')
            } else {
                res.json(result.rows[0])
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("internal server error")
        }
    }
})

//create one
app.post('/', async (req, res) => {
    try {
        const { art_name, art_year, art_type, about, image_url } = req.body;
        const result = await pool.query('INSERT INTO portfolio(art_name, art_year, art_type, about, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', [art_name, art_year, art_type, about, image_url]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error")
    }
})

//Delete one;
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number.isInteger(id))) {
        req.status(400).send("Bad Request")
    } else {
            try {
            const result = await pool.query('DELETE FROM portfolio WHERE id = $1 RETURNING *', [id]);
            if (result.rowCount === 0) {
                res.status(404).send('Not Found')
            } else { }
            res.json(result.rows(0))
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error')
        }
    }
})

//update one
app.patch('/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number.isInteger(id))) {
        req.status(400).send("Bad Request")
    } else {
        const patchData = req.body
        const keyList = Object.keys(patchData);
        let sqlString = 'UPDATE portfolio SET '
        let inputs = ''
        for (let i = 0; i < keyList.length; i++){
            if (patchData[keyList[i]] === undefined || patchData[keyList[i]] === '') {
                res.status(400).send('Bad request');
                return;
            }
            if (keyList[i] !== 'year') {
                patchData[keyList[i]] = '\'' + patchData[keyList[i]] + '\'';
            } else { //
                if (isNaN(parseInt(patchData[keyList[i]]))) {
                    res.status(400).type('text/plain').send('Bad Request');
                    return;
                }
            } if (i < keyList.length - 1) {// for each key found in patchdata,
                //  update the preexisting data's value and separate with commas
                inputs += keyList[i] + ' = ' + patchData[keyList[i]] + ',';
            } else { //last item, no comma
                inputs += keyList[i] + ' = ' + patchData[keyList[i]]
            }
        } sqlString += inputs;
        sqlString += ' WHERE id = ' + '\'' + id + '\' RETURNING *';
        try {
            const result = await pool.query(sqlString)
            if (result.rowCount === 0) {
                res.status(404).send('Not Found')
            } else {
                res.json(result.rows[0])
            }
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
}
})


app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`);
});