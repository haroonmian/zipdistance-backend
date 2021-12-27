'use strict';
const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [];
    await new Promise((resolve, reject) => fs.createReadStream("zipcodes.csv")
        .pipe(csv())
        .on('data', (row) => {
            data.push({
              zip: row.zip,
              latitude: Number(row.latitude),
              longitude: Number(row.longitude),
              createdAt: new Date(),
              updatedAt: new Date()
            })
        })
        .on('end', () => {
          resolve()
        })
    )

    return queryInterface.bulkInsert('Zipcodes', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Zipcodes', null, {});
  }
};
