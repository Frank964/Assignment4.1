

router.get('/', async (req, res)=>{
    const todolist = await todoCollection.find({}).toArray();
   res.render('todolist',{
       todolist
    })
});
       
module.exports = router;