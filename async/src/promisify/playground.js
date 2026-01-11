import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import promisify from "./promisify.js";

const __currFileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__currFileName);
const filePathToRead =  join(__dirname, "index.js")

const promisifiedReadFile = promisify(fs.readFile);

promisifiedReadFile(filePathToRead, "utf-8")
  .then(data => {
    console.log("Found the data ",data);
  })
  .catch(err => {
    console.log("Throws : ", err)
  })
