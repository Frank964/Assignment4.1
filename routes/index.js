const router = require('express').Router();
const { MongoClient } = require('mongodb');MongoClient;

const todo = require('./todolist.json');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true});

let employeedb;
let todoCollection;

//this function connects to the mongo db
const mainConnect = async () => {  
    await client.connect(); 
    employeedb = client.db('employeedb');
    todoCollection = employeedb.collection('todo');

};
mainConnect();

const createMany = async (data) => {
    try{
        const result = await todoCollection.insertMany(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally {}
}

const createTodo = async (data) => {
    try{
        const result = await todoCollection.insertOne(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally{}
}

const getAll = async () => {
    try {
        const result = await todoCollection.find({}).toArray();
        return result;
    } catch (error) {
        console.log(error)
    }
    finally{}
}
const employees = [
    {
        name: "Harley Martins",
        ID: "ESD001",
        position: "Chief Scientist",
        image: "/images/Harley.jpg"
       
    },
    {
        name: "Ifechukwu Simi",
        ID: "ESD002",
        position: "Head of Staff",
        image: "/images/ifee.jpg"
      
    },
    {
        name: "Sandra Chekwas",
        ID: "ESD003",
        position: "Head of Security",
        image: "/images/sandra.jpg"
        
    },
    {
        name: "Fred Sam",
        ID: "ESD004",
        position: "HR Manager",
        image: "/images/fred.jpg"
    },
    {
        name: "Matthew Klu",
        ID: "ESD005",
        position: "Chef Assistant",
        image: "/images/matthew.jpg"
      
    },
    {
        name: "Desir Pram",
        ID: "ESD006",
        position: "Head Chef",
        image: "/images/desir.jpg"
    },
    {
        name: "Uche Uba",
        ID: "ESD007",
        position: "Chief of Marketting Dept.",
        image: "/images/uche.jpg"
    },
    {
        name: "Deodat Martin",
        ID: "ESD008",
        position: "Medical Dept intern",
        image: "/images/deodat.jpg"
    },
    {
        name: "Lilian Nwatakwocha",
        ID: "ESD009",
        position: "Secretary",
        image: "/images/lilian.jpg"
    }
      
]

router.get('/', (req, res)=>{
    res.render('home', {
        title:'Home',
    })
});

router.get('/employeelist',  (req, res)=>{
    res.render('employee', {
        title:'Employees',
        employees
    })
    
});

router.get('/todolist', async (req, res)=>{
   const todolist = await getAll();
    res.render('todo',{
       todolist
   })
   
});
     
router.get('/createMany', async (req, res)=>{
    const todolist = await createMany(todo)
    res.redirect('/todolist')
 });
      
module.exports = router;