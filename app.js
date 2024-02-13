const express = require('express');
const app = express()
const path = 3000
const PersonSchema = require('./users/person')
app.listen(path, () => {
    console.log('the server is activated')
})
app.use(express.json())
// http://www.localhost:3000/create
app.post('/create', async (req, res) => {
    try {
        const data = req.body
        const person = await PersonSchema.create(data)
        res.status(201).send(person)
    }
    catch (e) {
        res.send({ message: e.message })
    }
})
// http://www.localhost:3000/find
app.get('/find', async (req, res) => {
    try {
        const person = await PersonSchema.find();
        if (!person) {
            console.log('there is no person here')
        }
        res.status(200).send(person);
    }
    catch (e) {
        res.send({ message: e.message })
    }
})
// http://www.localhost:3000/findOne
app.get('/findOne/:name', async (req, res) => {
    try {
        const name = req.params.name
        const person = await PersonSchema.findOne({ name });
        if (!person) {
            console.log('there is no person here with this name')
        }
        res.status(200).send(person);
    }
    catch (e) {
        res.send({ message: e.message })
    }
})
// http://www.localhost:3000/findById/
app.get('/findById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const person = await PersonSchema.findById(id);/**put id**/
        res.status(200).send(person);
    }
    catch (e) {
        res.send({ message: e.message })
    }
})
// http://www.localhost:3000/update/
app.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const person = await PersonSchema.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!person) {
            res.send('No person to update');
        } else {
            res.status(200).send(person);
        }
    } catch (e) {
        res.send({ message: e.message });
    }
});
// http://www.localhost:3000/addsom/
app.patch('/addsom/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const person = await PersonSchema.findOne({ _id: id });
        if (!person) {
            return res.send('No person to update');
        }
        person.favoriteFood.push("hamburger");
        await person.save();
        res.status(200).send(person);
    } catch (e) {
        res.send({ message: e.message });
    }
});
// http://www.localhost:3000/delete
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const person = await PersonSchema.findByIdAndDelete(id); 
        res.status(200).send(person);
    }
    catch (e) {
        res.send({ message: e.message })
    }
})
// http://www.localhost:3000/delete
app.delete('/delete/', async (req, res) => {
    try {
        const data = req.body
        const person = await PersonSchema.deleteMany(data); 
        res.status(200).send(person);
    }
    catch (e) {
        res.send({ message: e.message })
    }
})
// exec
run()
function run() {
    PersonSchema
        .find({ favoriteFood: 'hamburger' })
        .sort('name')
        .limit(1)
        .exec()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        })

}