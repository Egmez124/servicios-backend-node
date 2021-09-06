import fs from "fs/promises";
import path from "path";
import faker from "faker";


class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async() => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async id => {
        try {
            let data = await fs.readFile(this.dbPath, "utf8");
            let result = JSON.parse(data);
            //console.log(result[0].id);
            let userFind = result.find(i=>i.id === id);
            if (userFind === -1){
                throw new Error ("error")
            }
            return userFind;
            
        } catch (error) {
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
        
    }

    static create = async (obj) => {
        try {
            let data = await this.findAll();
            let nextid = data.length + 1;
            let newObj = obj;
            console.log(obj);
            newObj.id = nextid;
            data.push(newObj);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return newObj;
        } catch (error) {
            throw new Error(error);
        }
    }

    static update = async (obj, id) => {
        
        try {
            let data = await this.findAll();
            let indexfind = data.findIndex( i => {return i.id === id});
            if (indexfind === -1){
                throw new Error("no existe el usuario")
            }
            let newObj = {id, ...obj}
            data[indexfind] = newObj;
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return newObj;
        } catch (error) {
            throw new Error(error);
        }
    }

    static delete = async id => {
        
        try {
            let data = await this.findAll();
            let indexfind = data.findIndex(i => i.id === id);
            if (indexfind === -1){
                return false;
            }
            data.splice(indexfind, 1);  
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return true;
        } catch (error) {
            throw new Error(error)
        }
    }

    static clear = async() => {
        try{
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        }catch(error){
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    static populateDB = async(size) => {
        let userArr = [];
        for(let i = 0; i<size; i++){
            let userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        }

        try{
            await fs.writeFile(this.dbPath, JSON.stringify(userArr));
            return userArr;
        }catch(error){
            throw new Error("Hubo un error al insertar en la base de datos");
        }
    }

}

export default AcademloDb;