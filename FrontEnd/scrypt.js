import * as module from "./module.mjs";
var data = await module.fetchData("works", "categories");
const homeGallery = document.querySelector(".portfolio__gallery");
module.mainFunctions.makeGallery(data.works, homeGallery);
module.mainFunctions.addListenerAndFilter(data.works);
module.mainFunctions.adminMode();
