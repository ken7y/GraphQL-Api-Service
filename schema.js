const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Customer Type
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type:GraphQLInt}
    })
})

const axios = require('axios');

//Test data
// const customers = [
//     {id:'1', name:'bob', email:'bob@gmail', age:35},
//     {id:'2', name:'jane', email:'jane@gmail', age:16},
//     {id:'3', name:'steve', email:'steve@gmail', age:72},
// ]

//Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
        fields:{    
            customer: {
            type: CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                // for(let i = 0; i < customers.length; i++){
                //     if(customers[i].id == args.id){
                //         return customers[i];
                //     }
                // }
                return axios.get('http://localhost:3000/customers/' + args.id)
                .then(res => res.data);
            }
        },
        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data);
                // return customers;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});


// http://localhost:4000/graphql?query={customers{name,age,email}}


// {customers{
//     name,age,email
//   }}


// {
//     customer(id:"2"){
//       name,
//       email,
//       age
//     }
//   }