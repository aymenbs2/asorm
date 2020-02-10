# AS-ORM
The AS-ORM  provides a beautiful, simple ActiveRecord implementation for working with your pouchdb database.
 Each database table has a corresponding "Entity" which is used to interact with that table with its DOA.
 
 #Installation
    ``` npm i asorm ```
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
   #  Put, Delete
   To create a new record in the database from an Entity, simply create a new entity instance and call the put method.
  
   ##put
    
        put create a new item if not exist else update it
    
    ```
        const user = new User();
        user._id= "123";
        user.name = "asorm_user";
        const doa = new  UserDOA();
        doa.put(user)
     ```
   ##delete
        
     ```
        const deleteRes = await doa.delete(user);
     ```
 or with where clause 
      
     ```
      const deleteRes = await doa.deleteWhere('name', 'asmorm_user', '=');
     ```
  return the an array has the responses
  
###Where 
Take 3 params the field , value and the logic operator in this example we will get the users that name equal to "asorm"
    
    ```
        const users = await doa.where('name', 'asrom', '=');
    ```
