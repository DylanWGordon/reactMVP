import express from 'express'
import pg from 'pg'
import AWS from 'aws-sdk'
import pkg from 'pg'
const { Pool } = pkg
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'

const app = express();
app.use(cors({ origin: '*' }))

const upload = multer({ dest: 'uploads/' })

dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: URL
})

const s3 = new AWS.S3;
const s3BucketName = 'fieryramencv';
const s3KeyPrefix = 'cvUploads/'


// app.use(express.static("dist"))
app.use(express.static("public"))

//get all
app.get(`/`, async (req, res) => {
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
app.get(`/id`, async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number.isInteger(id))) {
        res.status(400).send("Bad Request")
    } else {
        try {
            const result = await pool.query('SELECT art_name, art_year, art_tags, about, image_url FROM portfolio WHERE art_id = $1', [parseInt(id)]);
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

// app.post('/', upload.single('image'), async (req, res) => {
//         try {
//             const { art_name, art_year, art_tags, about} = req.body;
//             const { path, originalName } = req.file

//             const fileContent = await fetch(`file://${path}`)
//             .then((res) => res.buffer());

//             const s3ObjectKey = s3KeyPrefix + originalName;

//             const s3UploadParams = {
//                 Bucket: s3BucketName,
//                 Key: s3ObjectKey,
//                 Body: fileContent
//             }

//             await s3.upload(s3UploadParams).promise();

//             const s3ObjectUrl= `https://${s3BucketName}.s3.amazonaws.com/${s3ObjectKey}`

//             const result = await pool.query('INSERT INTO portfolio(art_name, art_year, art_tags, about, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', [art_name, art_year, art_tags, about, s3ObjectUrl]);
//             res.status(200).json({
//                 message: 'Image uploaded and portfolio item created',
//                 id: result.rows[0].art_id
//             });
//         } catch (err) {
//             console.error(err);
//             res.status(500).send("Internal server error")
//         }

// })

app.post(`/`, upload.single('image'), async (req, res) => {
    console.log(req)
    try {
        const { art_name, art_year, art_tags, about } = req.body;
        const { path, originalName } = req.file;

        // Fetch the file content
        let fileContent;
        try {
            const response = await fetch(`file://${path}`);
            fileContent = await response.buffer();
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error occurred while fetching file content');
        }

        // Upload to S3
        const s3ObjectKey = s3KeyPrefix + originalName;
        const s3UploadParams = {
            Bucket: s3BucketName,
            Key: s3ObjectKey,
            Body: fileContent,
        };

        try {
            await s3.upload(s3UploadParams).promise();
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error occurred while uploading to S3');
        }

        // Insert into database
        const s3ObjectUrl = `https://${s3BucketName}.s3.amazonaws.com/${s3ObjectKey}`;

        try {
            const result = await pool.query('INSERT INTO portfolio(art_name, art_year, art_tags, about, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', [art_name, art_year, art_tags, about, s3ObjectUrl]);
            res.status(200).json({
                message: 'Image uploaded and portfolio item created',
                id: result.rows[0].art_id,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error occurred while inserting into the database');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// app.post('/', async (req, res) => {
// })

//Delete one;
app.delete(`/id`, async (req, res) => {
    const { id } = req.params;
    if (isNaN(Number.parseInt(id))) {
        res.status(400).send("Bad Request")
    } else {
        try {
            const result = await pool.query('DELETE FROM portfolio WHERE id = $1 RETURNING *', [parseIntId]);
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
app.patch(`/id`, async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        res.status(400).send("Bad Request")
    } else {
        const patchData = req.body
        const keyList = Object.keys(patchData);
        let sqlString = 'UPDATE portfolio SET '
        let inputs = ''
        for (let i = 0; i < keyList.length; i++) {
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
        sqlString += ` WHERE id = ` + `\`` + id + `\` RETURNING *`;
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