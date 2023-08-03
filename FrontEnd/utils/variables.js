var adminbar = document.querySelector(".adminbar");
var logout = document.querySelector(".nav__login");
var header = document.querySelector("header");
var btnModifier = document.querySelector(".portfolio .btn-modifier");
var allBtnModifier = document.querySelectorAll(".btn-modifier");
var portfolioFigure = document.querySelectorAll(".portfolio__gallery figure");
var overlay = document.querySelector(".overlay");
var authErrorMessage = document.querySelector(".auth-error");
var authForm = document.querySelector(".auth__form");
var filterBtn = document.querySelector("main .portfolio ul");
var portfolioGallery = document.querySelector(".portfolio__gallery");
var filterWrapper = document.querySelector('.filter__wrapper')
// MODAL VARIABLES //
var modal = document.querySelector(".modal");
var modalLayers = document.querySelectorAll(".modal__wrapper");
var modalGallery = document.querySelector(".modal__gallery");
var closeBtn = document.querySelectorAll(".close-btn");
var btnDelete = document.querySelector('.btn-delete')
var options = document.querySelectorAll("option");
var inputFile = document.querySelector('input[type="file"]');
var inputText = document.querySelector('.modal [type="text"]');
var placeholderImg = document.querySelector(".preview");
var btnPreviousModal = document.querySelector(".back-btn");
var btnAjouterImage = document.querySelector(".modal__footer .btn--active");
var modalFigure = document.querySelectorAll(".modal figure");
// ELSE // 
var indexUrl = "./";
var modalForm = document.querySelector(".modal__content form");
var token = sessionStorage.getItem("token");

export { btnDelete, allBtnModifier, filterWrapper, adminbar, logout, header, btnModifier, portfolioFigure, overlay, authErrorMessage, authForm, filterBtn, portfolioGallery, modal, modalLayers, modalGallery, closeBtn, options, inputFile, inputText, placeholderImg, btnPreviousModal, btnAjouterImage, modalFigure, indexUrl, modalForm, token };
