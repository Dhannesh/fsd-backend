import fs from 'node:fs'

fs.writeFileSync('./output.txt','Hello from node')

const data = fs.readFileSync('./output.txt')
const data2 = fs.readFileSync('./output.txt',{encoding:'utf-8'})
console.log(data);
console.log(data2);

