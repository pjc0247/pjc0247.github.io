(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n\n<div style=\"height: 200px\"></div>\n<div class=\"container is-fullhd width-1000\">\n  <!-- TITLE -->\n  <div class=\"title-container\">\n    <h1 style=\"padding-bottom: 10px\" class=\"title\">IMPROVE YOUR CODE</h1>\n    <h2 class=\"subtitle\">Check most common mistakes in Online</h2>\n  </div>\n\n  <div style=\"height:80px\"></div>\n  <p class=\"control has-icons-left has-icons-right\">\n    <input \n      class=\"input is-medium\" type=\"text\" placeholder=\"https://www.github.com/pjc0247/mchain\"\n      (change)=\"onChangeGithubUrl()\"\n      [(ngModel)]=\"repoUrl\">\n    <span class=\"icon is-small is-left\">\n      <i style=\"color:black\" class=\"fab fa-github-alt\"></i>\n    </span>\n\n    <span\n      *ngIf=\"isValidRepoUrl == false && repoUrl.length > 0\"\n      class=\"invalid-url\">Please input valid Github URL.</span>\n  </p>\n\n  <a class=\"button is-primary\"\n     [class.is-loading]=\"isLoading\"\n     (click)=\"onClickAnalyze()\">\n     Start Analyze!\n  </a>\n\n  <div style=\"height:40px\"></div>\n  <app-dummy-results></app-dummy-results>\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title-container {\n  text-align: center; }\n\n.width-800 {\n  max-width: 800px; }\n\n.width-1000 {\n  max-width: 1000px; }\n\n.invalid-url {\n  color: red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRjpcXEdpdGh1YlxcY291bGRfYmVfYmV0dGVyXFxmcm9udGVuZFxcY2JiL3NyY1xcYXBwXFxhcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSxpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxVQUFVLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGUtY29udGFpbmVyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLndpZHRoLTgwMCB7XHJcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xyXG59XHJcbi53aWR0aC0xMDAwIHtcclxuICAgIG1heC13aWR0aDogMTAwMHB4O1xyXG59XHJcblxyXG4uaW52YWxpZC11cmwge1xyXG4gICAgY29sb3I6IHJlZDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cbb_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cbb-api.service */ "./src/app/cbb-api.service.ts");
/* harmony import */ var _github_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./github.service */ "./src/app/github.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(api, github) {
        this.api = api;
        this.github = github;
        this.title = 'cbb';
        this.repoUrl = "";
        this.isValidRepoUrl = false;
        this.isLoading = false;
    }
    AppComponent.prototype.onChangeGithubUrl = function () {
        this.isValidRepoUrl = this.github.isValidGithubUrl(this.repoUrl);
        console.log(this.isValidRepoUrl);
    };
    AppComponent.prototype.onClickAnalyze = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var repo;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isValidRepoUrl == false)
                            return [2 /*return*/];
                        repo = this.github.parseGithubUrl(this.repoUrl);
                        this.isLoading = true;
                        return [4 /*yield*/, this.api.requestAnalyze(repo.owner, repo.repo)];
                    case 1:
                        _a.sent();
                        this.isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_cbb_api_service__WEBPACK_IMPORTED_MODULE_2__["CbbApiService"],
            _github_service__WEBPACK_IMPORTED_MODULE_3__["GithubService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _dummy_results_dummy_results_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dummy-results/dummy-results.component */ "./src/app/dummy-results/dummy-results.component.ts");








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                _dummy_results_dummy_results_component__WEBPACK_IMPORTED_MODULE_7__["DummyResultsComponent"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/cbb-api.service.ts":
/*!************************************!*\
  !*** ./src/app/cbb-api.service.ts ***!
  \************************************/
/*! exports provided: CbbApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CbbApiService", function() { return CbbApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var CbbApiService = /** @class */ (function () {
    function CbbApiService(http) {
        this.http = http;
    }
    CbbApiService.prototype.requestAccessToken = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CbbApiService.prototype.requestAnalyze = function (owner, repo) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.http.post('http://localhost:4000/api/analyze', {
                    owner: owner, repo: repo
                })
                    .subscribe(function (resp) {
                    console.log(resp);
                });
                return [2 /*return*/];
            });
        });
    };
    CbbApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], CbbApiService);
    return CbbApiService;
}());



/***/ }),

/***/ "./src/app/dummy-results/dummy-results.component.html":
/*!************************************************************!*\
  !*** ./src/app/dummy-results/dummy-results.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dummy-results\">\n  <nav class=\"level\">\n    <div class=\"level-item has-text-centered\">\n      <div>\n        <p class=\"heading\">Total Files</p>\n        <p class=\"title\">3,456</p>\n      </div>\n    </div>\n    <div class=\"level-item has-text-centered\">\n      <div>\n        <p class=\"heading\">Avg. Lines</p>\n        <p class=\"title\">123</p>\n      </div>\n    </div>\n    <div class=\"level-item has-text-centered\">\n      <div>\n        <p class=\"heading\">Avg. Method Lines</p>\n        <p class=\"title\">456K</p>\n      </div>\n    </div>\n    <div class=\"level-item has-text-centered\">\n      <div>\n        <p class=\"heading\">Most Longest Method</p>\n        <p class=\"title\">Networking.cs</p>\n        <p class=\"title\">1,142 lines</p>\n        </div>\n      </div>\n    </nav>\n\n\n    <div style=\"height:50px\"></div>\n<div class=\"card\">\n  <header class=\"card-header\">\n    <p class=\"card-header-title\">\n      <i style=\"color:black; opacity: 0.4\" class=\"fas fa-code\"></i>\n      &nbsp;&nbsp;&nbsp;./Assets/Script/InputController.cs\n    </p>\n    <a href=\"#\" class=\"card-header-icon\" aria-label=\"more options\">\n      <span class=\"icon\">\n        <i class=\"fas fa-angle-down\" aria-hidden=\"true\"></i>\n      </span>\n    </a>\n  </header>\n  <div class=\"card-content\">\n    <article class=\"message is-warning\">\n        <div class=\"message-body\">\n          <strong>Line 154, Cols 20</strong>\n          <pre><code class=\"cs\">public static void rotationV() {{</code></pre>\n          Method name should be a VERB: 'rotationV'\n        </div>\n    </article>\n  </div>\n  <div class=\"card-content\">\n      <article class=\"message is-warning\">\n          <div class=\"message-body\">\n            <strong>Line 154, Cols 20</strong>\n            <pre><code class=\"cs\">public static void rotationV() {{</code></pre>\n            Method name should be a VERB: 'rotationV'\n          </div>\n      </article>\n    </div>\n    <div class=\"card-content\">\n        <article class=\"message is-warning\">\n            <div class=\"message-body\">\n              <strong>Line 154, Cols 20</strong>\n              <pre><code class=\"cs\">public static void rotationV() {{</code></pre>\n              Method name should be a VERB: 'rotationV'\n            </div>\n        </article>\n      </div>\n  <footer class=\"card-footer\">\n  </footer>\n</div>\n\n  <div class=\"overlay-text\">\n    <h1 class=\"title\">TRY IT NOW!</h1>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/dummy-results/dummy-results.component.scss":
/*!************************************************************!*\
  !*** ./src/app/dummy-results/dummy-results.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dummy-results {\n  opacity: 0.3;\n  transition: opacity 0.25s; }\n  .dummy-results .overlay-text {\n    position: fixed;\n    left: 0px;\n    bottom: 20px;\n    text-align: center;\n    width: 100%;\n    opacity: 0;\n    transition: all 0.25s; }\n  .dummy-results:hover {\n  opacity: 0.8; }\n  .dummy-results:hover .overlay-text {\n    opacity: 1.0;\n    bottom: 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZHVtbXktcmVzdWx0cy9GOlxcR2l0aHViXFxjb3VsZF9iZV9iZXR0ZXJcXGZyb250ZW5kXFxjYmIvc3JjXFxhcHBcXGR1bW15LXJlc3VsdHNcXGR1bW15LXJlc3VsdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFZO0VBRVoseUJBQXlCLEVBQUE7RUFIN0I7SUFNUSxlQUFlO0lBQ2YsU0FBUztJQUNULFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsV0FBVztJQUVYLFVBQVU7SUFDVixxQkFBcUIsRUFBQTtFQUc3QjtFQUNJLFlBQVksRUFBQTtFQURoQjtJQUlRLFlBQVk7SUFDWixZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9kdW1teS1yZXN1bHRzL2R1bW15LXJlc3VsdHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZHVtbXktcmVzdWx0cyB7XHJcbiAgICBvcGFjaXR5OiAwLjM7XHJcblxyXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjI1cztcclxuXHJcbiAgICAub3ZlcmxheS10ZXh0IHtcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgbGVmdDogMHB4O1xyXG4gICAgICAgIGJvdHRvbTogMjBweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzO1xyXG4gICAgfVxyXG59XHJcbi5kdW1teS1yZXN1bHRzOmhvdmVyIHtcclxuICAgIG9wYWNpdHk6IDAuODtcclxuXHJcbiAgICAub3ZlcmxheS10ZXh0IHtcclxuICAgICAgICBvcGFjaXR5OiAxLjA7XHJcbiAgICAgICAgYm90dG9tOiA1MHB4O1xyXG4gICAgfVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/dummy-results/dummy-results.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/dummy-results/dummy-results.component.ts ***!
  \**********************************************************/
/*! exports provided: DummyResultsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DummyResultsComponent", function() { return DummyResultsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DummyResultsComponent = /** @class */ (function () {
    function DummyResultsComponent() {
    }
    DummyResultsComponent.prototype.ngOnInit = function () {
        // @ts-ignore
        hljs.initHighlightingOnLoad();
    };
    DummyResultsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dummy-results',
            template: __webpack_require__(/*! ./dummy-results.component.html */ "./src/app/dummy-results/dummy-results.component.html"),
            styles: [__webpack_require__(/*! ./dummy-results.component.scss */ "./src/app/dummy-results/dummy-results.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DummyResultsComponent);
    return DummyResultsComponent;
}());



/***/ }),

/***/ "./src/app/github.service.ts":
/*!***********************************!*\
  !*** ./src/app/github.service.ts ***!
  \***********************************/
/*! exports provided: GithubService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GithubService", function() { return GithubService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var GithubService = /** @class */ (function () {
    function GithubService() {
    }
    GithubService_1 = GithubService;
    GithubService.prototype.isValidGithubUrl = function (url) {
        return GithubService_1.regex.test(url);
    };
    GithubService.prototype.parseGithubUrl = function (url) {
        var r = GithubService_1.regex.exec(url);
        if (r == null)
            return;
        return {
            owner: r[1], repo: r[2]
        };
    };
    var GithubService_1;
    GithubService.regex = /github\.com\/([a-zA-Z_]*)\/([a-zA-Z_]*)/;
    GithubService = GithubService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], GithubService);
    return GithubService;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar\" role=\"navigation\" aria-label=\"main navigation\">\n    <div class=\"navbar-brand\">\n      <a class=\"navbar-item\" href=\"https://bulma.io\">\n        <span>CouldBeBetter</span>\n        <!--\n        <img src=\"https://bulma.io/images/bulma-logo.png\" width=\"112\" height=\"28\">\n        -->\n      </a>\n  \n      <a role=\"button\" class=\"navbar-burger burger\" aria-label=\"menu\" aria-expanded=\"false\" data-target=\"navbarBasicExample\">\n        <span aria-hidden=\"true\"></span>\n        <span aria-hidden=\"true\"></span>\n        <span aria-hidden=\"true\"></span>\n      </a>\n    </div>\n  \n    <div id=\"navbarBasicExample\" class=\"navbar-menu\">\n      <div class=\"navbar-start\">\n        <a class=\"navbar-item\">\n          Home\n        </a>\n        <a class=\"navbar-item\">\n          Github\n        </a>\n  \n        <div class=\"navbar-item has-dropdown is-hoverable\">\n          <a class=\"navbar-link\">\n            Author\n          </a>\n  \n          <div class=\"navbar-dropdown\">\n            <a class=\"navbar-item\">\n              About\n            </a>\n            <a class=\"navbar-item\">\n              Jobs\n            </a>\n            <a class=\"navbar-item\">\n              Contact\n            </a>\n            <hr class=\"navbar-divider\">\n            <a class=\"navbar-item\">\n              Report an issue\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <a href=\"https://github.com/pjc0247/could_be_better\" class=\"github-corner\" style=\"z-index:111111111\" aria-label=\"View source on GitHub\"><svg width=\"80\" height=\"80\" viewBox=\"0 0 250 250\" style=\"fill:#64CEAA; color:#fff; position: absolute; top: 0; border: 0; right: 0;\" aria-hidden=\"true\"><path d=\"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z\"></path><path d=\"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2\" fill=\"currentColor\" style=\"transform-origin: 130px 106px;\" class=\"octo-arm\"></path><path d=\"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z\" fill=\"currentColor\" class=\"octo-body\"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>\n</nav>\n\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.scss":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar {\n  background: #f0f0f0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL0Y6XFxHaXRodWJcXGNvdWxkX2JlX2JldHRlclxcZnJvbnRlbmRcXGNiYi9zcmNcXGFwcFxcbmF2YmFyXFxuYXZiYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBa0MsRUFBQSIsImZpbGUiOiJzcmMvYXBwL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2YmFyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQwLCAyNDAsIDI0MCwgMSk7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/navbar/navbar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\Github\could_be_better\frontend\cbb\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map