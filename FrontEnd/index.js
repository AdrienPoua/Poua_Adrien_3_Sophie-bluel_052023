import { getData } from "./modules/asyncFunctions.js";
import { adminLayout, listenBtnFilter, makeFilterBtns, makeGallery, setAdminEventListener } from "./modules/pageBuilder.js";
import { isLocalStorageToken } from "./utils/functions.js";
import { modalGallery, portfolioGallery } from "./utils/variables.js";

export const works = await getData("works");
const categories = await getData("categories");
if (isLocalStorageToken()) {
  adminLayout(categories);
  makeGallery(works, modalGallery);
  setAdminEventListener();
}
makeGallery(works, portfolioGallery)
makeFilterBtns(categories)
listenBtnFilter(works)
