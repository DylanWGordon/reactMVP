import express from 'express'
import pg from 'pg'
import AWS from 'aws-sdk'
import pkg from 'pg'
const { Pool } = pkg
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'
import fs from 'fs'


const app = express();
app.use(cors({ origin: '*' }))

const upload = multer({ dest: 'uploads/' })

dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: URL
})

AWS.config.update({
    region: 'us-west-2',
    credentials: new AWS.Credentials({
        accessKeyId: 'AKIASETWN62PDKHMWYH6',
        secretAccessKey: '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'
    }),
});

const s3 = new AWS.S3;
const s3BucketName = 'fieryramencv';
const s3KeyPrefix = 'cvUploads/'


app.use(express.static("dist"))
// app.use(express.static("public"))

//get all
app.get(`/pieces`, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM portfolio ORDER BY art_year DESC');
        res.json(result.rows)
    } catch (err) {
        console.log(req)
        console.error(err)
        res.status(500).message("Internal Server Error")
    }
})


//Get one
app.get(`/pieces/:id`, async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        res.status(400).send("Bad Request")
    } else {
        try {
            const result = await pool.query('SELECT art_name, art_year, art_tags, about, image_url FROM portfolio WHERE art_id = $1', [id]);
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

app.post(`/pieces`, upload.single('image'), async (req, res) => {
    console.log(req);
    try {
        const { art_name, art_year, art_tags, about } = req.body;
        const { path, originalname } = req.file;

        // Read the file content from the local filesystem
        const fileContent = fs.readFileSync(path);

        // Upload to S3
        const s3ObjectKey = s3KeyPrefix + originalname;
        const s3UploadParams = {
            Bucket: s3BucketName,
            Key: s3ObjectKey,
            Body: fileContent,
        };

        await s3.upload(s3UploadParams).promise();

        // Insert into database
        const s3ObjectUrl = `https://${s3BucketName}.s3.amazonaws.com/${s3ObjectKey}`;

        const result = await pool.query('INSERT INTO portfolio(art_name, art_year, art_tags, about, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', [art_name, art_year, art_tags, about, s3ObjectUrl]);
        res.status(200).json({
            message: 'Image uploaded and portfolio item created',
            id: result.rows[0].art_id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


//Delete one;
app.delete(`/pieces/:id`, async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number.parseInt(id))) {
        res.status(400).send("Bad Request")
    } else {
        try {
            const result = await pool.query('DELETE FROM portfolio WHERE art_id = $1 RETURNING *', [parseInt(id)]);
            if (result.rowCount === 0) {
                res.status(404).send('Not Found')
            } else { }
            res.json(result.rows[0])
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error')
        }
    }
})

//update one
app.patch(`/pieces/:id`,  async (req, res) => {
   
        try {
            const { art_name, art_year, art_tags, about } = req.body;
            const { id } = req.params;
            if (isNaN(parseInt(id))) {
                res.status(400).send("Bad Request")
            } else {
                const patchData = req.body
                const keyList = Object.keys(patchData);
                let sqlString = 'UPDATE portfolio SET '
                let inputs = ''
                console.log(patchData)
                for (let i = 0; i < keyList.length; i++) {
                    if (patchData[keyList[i]] === undefined || patchData[keyList[i]] === '') {
                        res.status(400).send('Bad request');
                        return;
                    }
                    if (keyList[i] !== 'art_year') {
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
                sqlString += ' WHERE art_id = ' + '\'' + id + '\' RETURNING *';

                const result = await pool.query(sqlString)
                if (result.rowCount === 0) {
                    res.status(404).send('Not Found')
                } else {
                    res.json(result.rows[0])
                }
            }
        } catch (err) {
            console.error(err)
            res.status(500).send('Internal Server Error')
        }
})



app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`);
})