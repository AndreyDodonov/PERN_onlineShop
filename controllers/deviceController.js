const {Device} = require ('../models/models');
const {DeviceInfo} = require ('../models/models');
const ApiError = require ('../handlers/ApiError');
const uuid = require ('uuid');
const path = require ('path');

class DeviceController {

    /*
        создать запись
    */
    async create (req, res, next) {
        try {
        let {name, price, brandId, typeId, info} = req.body;
        const {img} = req.files;
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const device = await Device.create({name, price, brandId, typeId, img: fileName});

        if (info) {
            info - JSON.parse(info);
            info.forEach(element => {
               DeviceInfo.create ({
                   title: element.title,
                   description: element.description,
                   deviceId: device.id
               }) 
            });
        }
        
        return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    /* 
        получить все записи
    */
    
    async getAll (req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1; // for pagination
        limit = limit || 10;
        let offset = page * limit - limit; 
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset});
            
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typedId}, limit, offset});
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typedId}, limit, offset});
        }
        return res.json(devices);
    }


    /*
        получение одной записи
    */

    async getOne (req, res) {
        const {id} = req.params;
        const device = await Device.findOne (
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    /*
        удалить запись
    */

    async delete (req, res) {

    }
} 

module.exports = new DeviceController();