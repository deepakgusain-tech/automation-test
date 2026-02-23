import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../test-data/runtimeData.json');

export function saveData(key: string, value: string) {
  let data: any = {};

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  
    data[key] = value;
  

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getData(key: string): string {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return data[key];
}