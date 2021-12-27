const models = require("../models");
const csv = require("csv-parser");
const fs = require("fs");
const { Op } = require("sequelize");
// const zipcodes = require("../data/zipcodes.csv")

const measureDistance = async (req, res) => {
    let zipcodes = req.body

    try {
        if (!zipcodes || !zipcodes.length) {
            throw 'ERROR: Invalid input, zipcode is required with zip'
        }

        let data = await models.Zipcodes.findAll({
            where: {
                zip: {
                    [Op.or]: zipcodes.map(zipcode => zipcode.zip)
                }
            }
        })

        data = zipcodes.map(zipcode => data.find(da => zipcode.id === da.id));

        function distance(lat1, lon1, lat2, lon2) {
            var p = (Math.PI / 180);    // Math.PI / 180
            var cos = Math.cos;
            var a = 0.5 - cos((lat2 - lat1) * p) / 2 +
                cos(lat1 * p) * cos(lat2 * p) *
                (1 - cos((lon2 - lon1) * p)) / 2;

            return 12742 * Math.asin(Math.sqrt(a)); // diameter of Earth = 12742 km
        }

        let zipcodeDistances = data.map((zipcode, index) => {
            let nextzipcode = index < (data.length - 1) ? data[index + 1] : null;
            let zipdistance = nextzipcode && distance(zipcode.latitude, zipcode.longitude, nextzipcode.latitude, nextzipcode.longitude)
            return {
                id: zipcode.id,
                zip: zipcode.zip,
                toZipcodeId: nextzipcode ? nextzipcode.id : null,
                distance: Number(zipdistance).toFixed(0)
            }
        })

        res.status(200).json({
            data: zipcodeDistances,
            error: null,
            message: 'SUCCESS'
        })
    }
    catch (err) {
        res.status(500).json({
            data: null,
            error: true,
            message: err
        })
    }
}

const search = async (req, res) => {
    let zipcode = req.params.zipcode

    try {
        let response = await models.Zipcodes.findAll({
            where: {
                [Op.or]: [
                    { 'zip': { [Op.like]: '%' + zipcode + '%' } }
                ]
            }
        })

        res.status(200).json({
            data: response,
            error: null,
            message: 'SUCCESS'
        })
    }
    catch(err) {
        res.status(500).json({
            data: null,
            error: err,
            message: 'ERROR: Internal Server'
        })
    }
}

const create = () => {
    
}

const initializeTable = () => {

}

module.exports = {
    measureDistance,
    search
}
