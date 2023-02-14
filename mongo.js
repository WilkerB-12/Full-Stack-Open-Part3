const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb://WbOpenFullStack:${password}@ac-4qg1l76-shard-00-00.cu73dvn.mongodb.net:27017,ac-4qg1l76-shard-00-01.cu73dvn.mongodb.net:27017,ac-4qg1l76-shard-00-02.cu73dvn.mongodb.net:27017/phone-book?ssl=true&replicaSet=atlas-qz495w-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4){
  Person.find({}).then(result=>{
    result.forEach(person=>{
      console.log(person.name+" "+person.number)
    })
   mongoose.connection.close() 
  })
}
else{
const person = new Person({
  name: newName,
  number: newNumber,
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})}