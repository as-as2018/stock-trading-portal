
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the swagger YAML file
export const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));


