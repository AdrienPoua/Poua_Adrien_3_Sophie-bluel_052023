import * as module from "./module.mjs";
let data = await module.fetchData('works','categories');
module.makeGallery(data.works);
module.filter(data.works)
module.adminMode()