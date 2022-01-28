const fs = require('fs');
const path = require('path');





const User = {
    autos: path.join(__dirname, '../dataBase/products.json'),

    getData: function(){
        return JSON.parse(fs.readFileSync(this.autos, 'utf-8'));
    },
    generateId: function(){
        let allAutos = this.findAll();
        let lastAuto = allAutos.pop();
        if(lastAuto){
        return lastAuto.id +1;
        }
        return 1;
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function(id){
        let allAutos = this.findAll();
        let autoFound = allAutos.find(auto => auto.id === id);
        return autoFound;
    },
    findByField: function(field, text){
        let allAutos = this.findAll();
        let autoFound = allAutos.find(auto => auto[field] === text);
        return userFound;
    },
    create: function (autoData){
        let allAutos = this.findAll();
        let newAuto = {
            id: this.generateId(),
            ...autoData

        }
        allAutos.push(newAuto);
        fs.writeFileSync(this.autos, JSON.stringify(allAutos, null,2));
        return newAuto;

    },
    delete: function(id){
        let allautos = this.findAll();
        let finalautos = allautos.filter(auto => auto.id !== id); 
        fs.writeFileSync(this.autos, JSON.stringify(finalautos, null,2));
        return true;
    }
}

module.exports = User;