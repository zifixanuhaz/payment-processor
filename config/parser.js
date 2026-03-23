const { parse } = require('csv-parser');
const fs = require('fs');
const path = require('path');

class Parser {
  constructor(file) {
    this.file = file;
  }

  async read() {
    return new Promise((resolve, reject) => {
      const csvData = [];
      fs.createReadStream(this.file)
       .pipe(parse({ delimiter: ',' }))
       .on('data', (row) => csvData.push(row))
       .on('end', () => resolve(csvData))
       .on('error', (error) => reject(error));
    });
  }

  async process(data) {
    const processedData = [];
    for (const row of data) {
      const processedRow = {};
      for (const [key, value] of Object.entries(row)) {
        processedRow[key] = value.trim();
      }
      processedData.push(processedRow);
    }
    return processedData;
  }
}

module.exports = Parser;