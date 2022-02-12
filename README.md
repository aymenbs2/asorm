# AS-ORM
The AS-ORM  provides a beautiful, simple ActiveRecord implementation for working with your pouchdb database.
 Each database table has a corresponding "Entity" which is used to interact with that table with its dao.
 

 ## Installation

If you use npm, hit this command in your favorite terminal:
```sh
   $ npm i asorm
```
Or, if you use yarn, hit this command
```sh
   $ yarn add asorm
```
    
 ## Basic Usage

 To get started, create an ASORM Entity
 
 ```js
    @Entity()
    class User {
        _id:string;
        name:string;
    }
 ```
   Once the entity is defined, now we must define its dao
   
```js
    @Dao(User)
    class UserDao {
    
    }
```
   #  Put, Delete , UpdateWhere , Where
   To create a new record in the database from an Entity, simply create a new entity instance and call the put method.
  
   ## put
    
        put create a new item if not exist else update it
    
```js
        const user = new User();
        user._id= "123";
        user.name = "asorm_user";
        const dao = new  Userdao();
        dao.put(user)
```
   ## UpdateWhere
   
```js
      const rest = await dao.updateWhere('_id', user._id, '');

```
   ## delete
        
```js
        const deleteRes = await dao.delete(user);
```
 or with where clause 
      
```js
      const deleteRes = await dao.deleteWhere('name', 'asmorm_user', '=');
```
  return the an array has the responses
  
### Where 
Take 3 params the field , value and the logic operator in this example we will get the users that name equal to "asorm"
    
```js
        const users = await dao.where('name', 'asrom', '=').apply();
```
### where operators
// todo
