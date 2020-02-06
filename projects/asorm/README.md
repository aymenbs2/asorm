# ASORM

The ASORM  provides a beautiful, simple ActiveRecord implementation for working with your pouchdb database.
 Each database table has a corresponding "Entity" which is used to interact with that table with its DOA.
 
 #Basic Usage
 To get started, create an ASORM Entity
 
    ```
    @Entity()
    class User {
        _id:string;
        name:string;
    }
    ```
   Once the entity is defined, now we must define its DOA
   
    ```
    @DOA(User)
    class UserDOA {
    
    }
     ```
   #  Put, Update, Delete
   To create a new record in the database from an Entity, simply create a new entity instance and call the put method.
    
    ```
        const user = new User();
        user._id= "123";
        user.name = "asorm_user";
        const doa = new  UserDOA();
        doa.put(user)
     ```
    ##Update
    //todo
    ##Delete
