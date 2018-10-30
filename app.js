const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const animals = [
    {
        name: "Tim",
        species: "Whale",
        gender: 'male',
        age: 18,
        animalId: 1
    },
    {
        name: "Vincenzo",
        species: "Snake",
        gender: 'male',
        age: 18,
        animalId: 2
    },
    
]

const zoos = [
    {
        name: 'vincenzoos',
        zooId: '1',
        animals: animals
    }
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}));


app.get('/zoos/:zooId/animals', function(req, res) {
    res.status(200).send(zoos);
})

app.get('/zoos/:zooId/animals/:animalId', function(req, res) {

    const zoo = zoos.filter(zoo => zoo.zooId == req.params.zooId)[0];
    if(zoo){
        console.log(zoo)
        const animal = zoo["animals"].filter(animal => animal.animalId == req.params.animalId)[0];
        
        if(animal) {
            return res.status(200).json(animal);
        } else {
            return res.status(404).json({err: "Couldn't find animal"})
        }
    }else{
        return res.status(404).json({err: "Couldn't find zoo"})
    }
});

app.post('/zoos/:zooId/animals', function(req, res) {
    const zoo = zoos.filter(zoo => zoo.zooId == req.params.zooId)[0];

    if(zoo) {
        const animal = req.body;
        let animalId = zoo.animals.length + 1;
        zoo.animals.push(animal)
        return res.status(200).json(animal);
    }else{
        return res.status(404).json({err: "Zoo not found"})
    }
})

app.put('/zoos/:zooId/animals/:animalId', function(req, res) {
    const zoo = zoos.filter(zoo => zoo.zooId == req.params.zooId)[0];

    if(zoo) {
        const index = zoo.animals.indexOf(req.params.animalId) 
        if(animal !== -1) {
            const updatedAnimal = req.body;
            zoo.animals[index] = udpatedAnimal;    
            return res.status(200).json(updatedAnimal);    
        }else {
            return res.status(200).json("Couldn't find animal to update")
        }
    }else {
        return res.status(404).json({err: "Zoo could not be found"})
    }
});

app.listen(3000, function() {
    console.log('App is listening on port 3000')
})
