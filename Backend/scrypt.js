import * as module from "./module.mjs";
let data = await module.fetchData('works','categories');
console.log(data.works);
module.makeGallery(data.works)
