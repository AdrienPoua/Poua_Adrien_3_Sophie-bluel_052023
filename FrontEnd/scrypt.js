import * as module from "./module.mjs"
import { mainFunctions } from "./module.mjs";
var data = await module.fetchData('works','categories');
mainFunctions.makeGallery(data.works);
console.log(data.works);
mainFunctions.filter(data.works);
mainFunctions.adminMode();
