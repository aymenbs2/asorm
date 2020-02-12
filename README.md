# AS-ORM
The AS-ORM  provides a beautiful, simple ActiveRecord implementation for working with your pouchdb database.
 Each database table has a corresponding "Entity" which is used to interact with that table with its dao.
 

 # Installation

    ``` npm i asorm ```
    
    
 # Basic Usage

 To get started, create an ASORM Entity
 
    ```
    @Entity()
    class User {
        _id:string;
        name:string;
    }
    ```
   Once the entity is defined, now we must define its dao
   
    ```
    @Dao(User)
    class UserDao {
    
    }
     ```
   #  Put, Delete, UpdateWhere, Where
   To create a new record in the database from an Entity, simply create a new entity instance and call the put method.
  
   ## put
    
        put create a new item if not exist else update it
    
    ```
        const user = new User();
        user._id= "123";
        user.name = "asorm_user";
        const dao = new  Userdao();
        dao.put(user)
     ```
   ## UpdateWhere
   
    ```
      const rest = await dao.updateWhere('_id', user._id, '');

     ```
   ## delete
        
     ```
        const deleteRes = await dao.delete(user);
     ```
 or with where clause 
      
     ```
      const deleteRes = await dao.deleteWhere('name', 'asmorm_user', '=');
     ```
  return an array with responses
  
### Where 
Take 3 params the field, value and the logic operator in this example we will get the users with name equal to "asorm"
    
    ```
        const users = await dao.where('name', 'asrom', '=').apply();
    ```
### where operators
//todo
