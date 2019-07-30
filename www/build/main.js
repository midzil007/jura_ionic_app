webpackJsonp([13],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_business_condition_business_condition__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_detail_detail__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







;
var BasketPage = /** @class */ (function () {
    function BasketPage(navCtrl, navParams, storage, http, dataService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.dataService = dataService;
        this.listBasketItems = [];
        this.saveListBasketItems = [];
        this.savedBasketItems = [];
        this.userData = [];
        this.searchTerm = "";
        this.nodeId = this.navParams.get('nodeid');
        this.dataService.saveOptions('4', 'navigate');
        this.listProducts = [];
        this.listProducts2 = [];
        this.listBasketItems = [];
        this.savedBasketItems = [];
        this.total = 0;
        this.countItems = 0;
        this.dataService.getOptions("savedBasketItems").then(function (savedBasketItems) {
            if (savedBasketItems) {
                _this.savedBasketItems = savedBasketItems;
            }
        });
        this.http.get('https://www.svycarskekavovary.cz?getproducts=1&nodeid=' + this.nodeId).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.listProducts = _this.initProducts(data.products);
        });
        this.dataService.getOptions("payment").then(function (payment) {
            if (payment) {
                _this.savedPayment = payment;
            }
        });
        this.dataService.getOptions("delivery").then(function (delivery) {
            if (delivery) {
                _this.savedDelivery = delivery;
            }
        });
        this.dataService.getData().then(function (userdata) {
            if (userdata) {
                _this.userData = JSON.parse(userdata);
            }
        });
    }
    BasketPage.prototype.ngOnInit = function () {
        //this.setFilteredItems();
    };
    BasketPage.prototype.setFilteredItems = function () {
        if (this.searchTerm != "") {
            this.items = this.dataService.filterItems(this.searchTerm);
        }
        else {
            this.items = [];
        }
    };
    BasketPage.prototype.showCondition = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_business_condition_business_condition__["a" /* BusinessConditionPage */]);
    };
    BasketPage.prototype.showDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_detail_detail__["a" /* DetailPage */], { item: item });
    };
    BasketPage.prototype.initProducts = function (data) {
        var list = [];
        var rowNum = 0;
        var item;
        var ii = 0;
        for (var i = 0; i < data.length; i += 2) {
            list[rowNum] = Array(2); //declare two elements per row
            if (data[i]) {
                item = data[i];
                list[rowNum][0] = {
                    id: item.id,
                    title: item.title,
                    url: item.path,
                    price: item.price,
                    html: item.html,
                    photo: item.photo,
                    dph: item.dph,
                    isTopOffer: item.topOffer
                };
                this.iniBasketItem(item);
            }
            if (data[i + 1]) {
                item = data[i + 1];
                list[rowNum][1] = {
                    id: item.id,
                    title: item.title,
                    url: item.path,
                    price: item.price,
                    html: item.html,
                    photo: item.photo,
                    dph: item.dph,
                    isTopOffer: item.topOffer
                };
                this.iniBasketItem(item);
            }
            rowNum++; //go on to the next row   
        }
        for (var _i = 0, _a = this.savedBasketItems; _i < _a.length; _i++) {
            var saveItem = _a[_i];
            this.getGoupInfoBasket(saveItem);
        }
        return list;
    };
    BasketPage.prototype.setBasketItem = function (item, count, mark) {
        var temp = [];
        var insert;
        var dataItem = {
            id: item.id,
            price: item.price,
            count: count,
            title: item.title,
            dph: item.dph
        };
        var tempItem;
        this.total = 0;
        this.countItems = 0;
        for (var _i = 0, _a = this.savedBasketItems; _i < _a.length; _i++) {
            var saveItem = _a[_i];
            if (saveItem.id == item.id) {
                if (mark == '+') {
                    dataItem.count = saveItem.count + 1;
                    console.log(dataItem.count);
                }
                else {
                    dataItem.count = saveItem.count - 1;
                    console.log(dataItem.count);
                }
                if (dataItem.count < 0) {
                    dataItem.count = 0;
                }
                this.getGoupInfoBasket(dataItem);
                console.log(dataItem);
                temp.push(dataItem);
                insert = true;
            }
            else {
                temp.push(saveItem);
                this.getGoupInfoBasket(saveItem);
            }
        }
        if (!insert) {
            temp.push(dataItem);
            this.getGoupInfoBasket(dataItem);
        }
        // tady to chce projet items list a ty inicialotovat....
        // console.log(this.listProducts);   
        //this.listBasketItems = this.init;
        this.savedBasketItems = temp;
        this.dataService.saveOptions(temp, "savedBasketItems");
    };
    BasketPage.prototype.iniBasketItem = function (item) {
        var dataItem = {
            id: item.id,
            price: item.price,
            count: 0,
            title: item.title,
            dph: item.dph
        };
        var temp = [];
        var isIn = false;
        //console.log(this.saveListBasketItems);  
        for (var _i = 0, _a = this.savedBasketItems; _i < _a.length; _i++) {
            var saveItem = _a[_i];
            if (saveItem.id == dataItem.id) {
                this.listBasketItems.push(saveItem);
            }
            isIn = true;
        }
        if (isIn == false) {
            this.listBasketItems.push(dataItem);
        }
        // console.log(this.listBasketItems);     
    };
    BasketPage.prototype.getGoupInfoBasket = function (item) {
        this.total += (item.count * item.price);
        this.countItems += item.count;
    };
    BasketPage.prototype.showCountItem = function (itemId) {
        for (var _i = 0, _a = this.savedBasketItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == itemId) {
                return item.count;
            }
        }
        return 0;
    };
    BasketPage.prototype.sendOrder = function () {
        var link = 'http://dunavox.specshop.cz/?test=1&requestIonicOrder=1';
        var bsdy = {
            payment: this.savedPayment,
            delivery: this.savedDelivery,
            data: this.listBasketItems,
            userData: this.userData
        };
        this.http.post(link, JSON.stringify(bsdy))
            .subscribe(function (data) {
        }, function (error) {
            console.log("Oooops!");
        });
    };
    BasketPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-basket',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/basket/basket.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Doplňovač zásob :D</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>  \n<ion-card *ngIf="total > 0" class="card-md">\n<div class="sumarry"> \n      Máte {{countItems}} ks za {{total}} Kč\n</div> \n</ion-card>\n<ion-grid>\n      <ion-searchbar\n    [(ngModel)]="searchTerm"\n    (ionChange)="setFilteredItems()">\n    </ion-searchbar>\n\n      <div *ngIf="searching" class="spinner-container">\n    <ion-spinner></ion-spinner>\n  </div>\n\n  <ion-list>   \n    <ion-item *ngFor="let item of items">\n      <a (click)="showDetail(item)">{{item.title}}</a>\n    </ion-item>\n  </ion-list>         \n\n  <ion-list *ngFor="let row of listProducts">\n    <ion-item class="item-basket" *ngFor="let item of row">\n      <ion-card *ngIf="item" class="card-md full basket-card">\n        <ion-avatar slot="start" class="ios my-avatar hydrated">\n        <img src="{{item.photo}}">    \n        </ion-avatar>      \n        <ion-card-content class="basket-car-c">     \n         <h4><a (click)="showDetail(item)">{{item.title}}</a></h4>  \n          <p float-left text-right margin-top>{{item.price}} Kč</p> \n           <div float-right>   \n    \n             <button  size="small" class="button-view" ion-button item-start (click)="setBasketItem(item, 1,\'-\')">-</button>\n              <span class="count">{{showCountItem(item.id)}} </span>\n             <button size="small" class="button-view" ion-button item-start (click)="setBasketItem(item, 1, \'+\')">+ </button>   \n            \n           </div>   \n        </ion-card-content>\n      </ion-card> \n    </ion-item>.   \n  </ion-list>\n</ion-grid>\n<ion-card>\n<div class="sumarry"> \n     Stisknutím tlačítka "ODESLAT OBJEDNÁVKU" souhlasíte s <a href="#" (click)="showCondition();">Obchodními a přepravními podmínkami</a>.\n</div> \n</ion-card>\n<ion-grid>\n  <ion-row>\n    <button padding ion-button full (click)="sendOrder()">ODESLAT OBJEDNÁVKU</button>  \n  </ion-row> \n</ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/basket/basket.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */]])
    ], BasketPage);
    return BasketPage;
}());

//# sourceMappingURL=basket.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        if (this.navParams.get('item')) {
            console.log(this.navParams.get('item'));
            this.item = this.navParams.get('item');
        }
        console.log(this.item);
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/detail/detail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Doplňovač zásob :D</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>  \n<ion-grid>\n</ion-grid>\n<ion-card>    \n	<h1>{{item.title}}</h1>\n	<img src="{{item.image}}">\n	<div [innerHTML]="item.html"></div>\n<div class="sumarry">  \n     Stisknutím tlačítka "ODESLAT OBJEDNÁVKU" souhlasíte s <a href="#" (click)="showCondition();">Obchodními a přepravními podmínkami</a>.\n</div> \n</ion-card>  \n<ion-grid>\n  <ion-row>\n    <button padding ion-button full (click)="sendOrder()">ODESLAT OBJEDNÁVKU</button>  \n  </ion-row> \n</ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/detail/detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrdersPage = /** @class */ (function () {
    function OrdersPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OrdersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrdersPage');
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/orders/orders.html"*/'<!--\n  Generated template for the OrdersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>orders</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/orders/orders.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstactionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





;
var InstactionsPage = /** @class */ (function () {
    function InstactionsPage(loadingCtrl, domSanitizer, navCtrl, navParams, http, data) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.data = data;
        this.listVideos = [];
        this.data.getOptions("machines").then(function (machines) {
            _this.http.get('https://www.svycarskekavovary.cz?getvideo=1&machines=' + machines).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.listVideos = _this.initVideos(data);
            });
        });
    }
    InstactionsPage.prototype.initVideos = function (data) {
        var showVideos = [];
        for (var i = 0; i < data.length; i += 1) {
            var video = {
                url: this.domSanitizer.bypassSecurityTrustResourceUrl(data[i].path),
                title: data[i].title
            };
            showVideos.push(video);
        }
        ;
        return showVideos;
    };
    InstactionsPage.prototype.ionViewWillEnter = function () {
        var vide2 = {
            url: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/kG4Ucb2u-pU'),
            title: 'Awesome video'
        };
        // this.listVideos =showVideos; 
        //  console.log( showVideos); 
        // this.listVideos.push(vide2); 
        //console.log(this.listVideos);      
        //  this.loading = this.loadingCtrl.create({
        //     content: 'Please wait...'
        // });   
        //  this.loading.present();
        //console.log(this.listVideos);    
    };
    InstactionsPage.prototype.handleIFrameLoadEvent = function () {
        // this.loading.dismiss();  
    };
    InstactionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InstactionsPage');
    };
    InstactionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-instactions',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/instactions/instactions.html"*/'<!--\n  Generated template for the InstactionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Návody</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>      \n   <ion-list *ngFor="let row of listVideos">\n <iframe width="100%"\n            height="315"    \n            [src]="row.url ? row.url : null"\n            (load)="trustedVideoUrl ? handleIFrameLoadEvent() : null"\n            frameborder="0"\n            allowfullscreen></iframe>\n       \n    <h2></h2>          \n</ion-list>\n</ion-content>\n '/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/instactions/instactions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */]])
    ], InstactionsPage);
    return InstactionsPage;
}());

//# sourceMappingURL=instactions.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_data_customer_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, view, http, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.view = view;
        this.http = http;
        this.data = data;
        this.data.getOptions('navigate').then(function (navigate) {
            if (navigate) {
                _this.navigate = navigate;
                console.log(navigate);
            }
            else {
                _this.navigate = '1';
                console.log(_this.navigate);
            }
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        //  console.log('ionViewDidLoad LoginPage'); 
    };
    LoginPage.prototype.singIn = function () {
        var _this = this;
        this.email = "b.kachlikova@akmrazik.cz";
        this.http.get('https://www.svycarskekavovary.cz?loginapi=1&email=' + this.email).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data.id) {
                _this.data.save(data);
                _this.data.saveOptions('1', 'navigate');
                console.log(data);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customer_data_customer_data__["a" /* CustomerDataPage */], { data: data });
            }
            // něco jako neplatný email
            //	console.log(this.islogin);    
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/login/login.html"*/'<ion-header>\n\n\n\n    <ion-title>\n    </ion-title>\n\n      \n\n</ion-header>\n<ion-content>\n<ion-card>\n <ion-card-content>\n  <img src="img/logo.png">\n  <h1>To je namo apka</h1>\n    Vítame vás v naší applikaci, bla bla bla\n<ion-list> \n    <ion-item>\n    <ion-label floating>Zadejte Email</ion-label>\n    <ion-input type="text" [(ngModel)]="email"></ion-input>\n  </ion-item>\n</ion-list>\n <button ion-button full (click)="singIn()">OK</button>\n  </ion-card-content>\n </ion-card>\n  <ion-card class="no-padding" text-center>\n     <img src="img/20855_6.jpg">\n  </ion-card>\n </ion-content>'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__basket_basket__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SectionPage = /** @class */ (function () {
    function SectionPage(navCtrl, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.sectionList = [];
        this.sectionList = [];
        this.http.get('https://www.svycarskekavovary.cz?section=1').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.sectionList = (data);
        });
    }
    SectionPage.prototype.itemSelected = function (id) {
        console.log(id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__basket_basket__["a" /* BasketPage */], { nodeid: id });
    };
    SectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-section',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/section/section.html"*/'<!--\n  Generated template for the SectionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>section</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n    <ion-list>\n    <ion-item *ngFor="let item of items">\n      {{ item.title }}\n    </ion-item>\n  </ion-list>\n\n<ion-card class="no-padding" *ngFor="let item of sectionList">	\n    <button class="customer" ion-button full class="wh-bg" icon-start (click)="itemSelected(item.id)">\n    <ion-label class="f-gry f-b t-l">{{item.title}} </ion-label>\n      <ion-icon class="f-gry" name="contacts" item-start></ion-icon>    \n    </button>   \n  </ion-card> \n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/section/section.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], SectionPage);
    return SectionPage;
}());

//# sourceMappingURL=section.js.map

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 121;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/basket/basket.module": [
		291,
		12
	],
	"../pages/business-condition/business-condition.module": [
		289,
		11
	],
	"../pages/confirm/confirm.module": [
		290,
		0
	],
	"../pages/customer-data/customer-data.module": [
		292,
		10
	],
	"../pages/customer-delivery/customer-delivery.module": [
		293,
		9
	],
	"../pages/customer-properties/customer-properties.module": [
		295,
		8
	],
	"../pages/customer/customer.module": [
		294,
		7
	],
	"../pages/detail/detail.module": [
		296,
		6
	],
	"../pages/instactions/instactions.module": [
		297,
		5
	],
	"../pages/login/login.module": [
		298,
		4
	],
	"../pages/modal-window/modal-window.module": [
		299,
		3
	],
	"../pages/orders/orders.module": [
		300,
		2
	],
	"../pages/section/section.module": [
		301,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 163;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_customer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__section_section__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__instactions_instactions__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__section_section__["a" /* SectionPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__customer_customer__["a" /* CustomerPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__instactions_instactions__["a" /* InstactionsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/tabs/tabs.html"*/'<ion-tabs>\n	<ion-tab [root]="tab1Root" tabTitle="Eshop" tabIcon="cart"></ion-tab>\n	<ion-tab [root]="tab2Root" tabTitle="Profil" tabIcon="settings"></ion-tab>\n	<ion-tab [root]="tab3Root" tabTitle="Návody" tabIcon="settings"></ion-tab>\n	<ion-tab [root]="tab4Root" tabTitle="Kontakt" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n   '/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-start></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessConditionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the BusinessConditionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BusinessConditionPage = /** @class */ (function () {
    function BusinessConditionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BusinessConditionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BusinessConditionPage');
    };
    BusinessConditionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-business-condition',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/business-condition/business-condition.html"*/'<!--\n  Generated template for the BusinessConditionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>business-condition</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/business-condition/business-condition.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], BusinessConditionPage);
    return BusinessConditionPage;
}());

//# sourceMappingURL=business-condition.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalWindowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ModalWindowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ModalWindowPage = /** @class */ (function () {
    function ModalWindowPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    ModalWindowPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalWindowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modal-window',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/modal-window/modal-window.html"*/'<!--\n  Generated template for the ModalWindowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>modal-window</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/modal-window/modal-window.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], ModalWindowPage);
    return ModalWindowPage;
}());

//# sourceMappingURL=modal-window.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(235);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_orders_orders__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_instactions_instactions__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_basket_basket__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_customer_customer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_detail_detail__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_section_section__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_customer_data_customer_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_customer_delivery_customer_delivery__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_customer_properties_customer_properties__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_login_login__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_storage__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_customer_customer__["a" /* CustomerPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_section_section__["a" /* SectionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_customer_data_customer_data__["a" /* CustomerDataPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_customer_delivery_customer_delivery__["a" /* CustomerDeliveryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_customer_properties_customer_properties__["a" /* CustomerPropertiesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_basket_basket__["a" /* BasketPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_instactions_instactions__["a" /* InstactionsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/business-condition/business-condition.module#BusinessConditionPageModule', name: 'BusinessConditionPage', segment: 'business-condition', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/confirm/confirm.module#ConfirmPageModule', name: 'ConfirmPage', segment: 'confirm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/basket/basket.module#BasketPageModule', name: 'BasketPage', segment: 'basket', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-data/customer-data.module#CustomerDataPageModule', name: 'CustomerDataPage', segment: 'customer-data', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-delivery/customer-delivery.module#CustomerDeliveryPageModule', name: 'CustomerDeliveryPage', segment: 'customer-delivery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer/customer.module#CustomerPageModule', name: 'CustomerPage', segment: 'customer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/customer-properties/customer-properties.module#CustomerPropertiesPageModule', name: 'CustomerPropertiesPage', segment: 'customer-properties', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/instactions/instactions.module#InstactionsPageModule', name: 'InstactionsPage', segment: 'instactions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-window/modal-window.module#ModalWindowPageModule', name: 'ModalWindowPage', segment: 'modal-window', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders/orders.module#OrdersPageModule', name: 'OrdersPage', segment: 'orders', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/section/section.module#SectionPageModule', name: 'SectionPage', segment: 'section', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_22__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_customer_customer__["a" /* CustomerPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_section_section__["a" /* SectionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_customer_data_customer_data__["a" /* CustomerDataPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_customer_delivery_customer_delivery__["a" /* CustomerDeliveryPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_customer_properties_customer_properties__["a" /* CustomerPropertiesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_basket_basket__["a" /* BasketPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_instactions_instactions__["a" /* InstactionsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_detail_detail__["a" /* DetailPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_21__providers_data_data__["a" /* DataProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(storage, http) {
        this.storage = storage;
        this.http = http;
        this.islogin = false;
        this.items = [];
        this.machinelist = [];
        this.basketlist = [];
    }
    DataProvider.prototype.filterItems = function (searchTerm) {
        var _this = this;
        this.http.get('https://www.svycarskekavovary.cz/jura/?getproducts=1&search=' + searchTerm).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.items = data.products;
            console.log(_this.items);
        });
        return this.items;
    };
    DataProvider.prototype.clearStorage = function () {
        this.storage.clear();
    };
    DataProvider.prototype.saveOptions = function (option, optionName) {
        this.storage.set(optionName, option);
    };
    DataProvider.prototype.getOptions = function (optionName) {
        return this.storage.get(optionName);
    };
    DataProvider.prototype.dataInitItems = function () {
        var _this = this;
        this.http.get('https://www.shop-jura.cz/?getproducts=1&onlykavovars=1').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.items = data.products;
        });
    };
    ;
    DataProvider.prototype.getData = function () {
        return this.storage.get('userdata');
    };
    DataProvider.prototype.save = function (lastdata) {
        var newData = JSON.stringify(lastdata);
        this.storage.set('userdata', newData);
    };
    DataProvider.prototype.getMachinesList = function () {
        //
        return this.storage.get('machinelist');
    };
    DataProvider.prototype.getBasketList = function () {
        return this.storage.get('basketlist');
    };
    DataProvider.prototype.saveToMachineList = function (item) {
        var _this = this;
        // tady dosetovat přislušetvni z internetu
        //tady dodělat init z db count aby bylo nula
        var url = 'https://www.shop-jura.cz/?getproducts=1&prislusenstvi=1&nodeid=' + item.id;
        //url =   'https://www.shop-jura.cz/?getproducts=1&onlykavovars=1';
        this.http.get(url).map(function (res) { return res.json(); }).
            subscribe(function (result) {
            _this.prislusenstvi = result.products;
            var machine = {
                id: item.id,
                title: item.title,
                machineprop: _this.prislusenstvi
            };
            // tady test jesli je to ok
            _this.machinelist.push({ key: item.id, value: machine });
            _this.storage.set('machinelist', _this.machinelist);
        });
        //
        //console.log(this.machinelist);            
        // 
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], DataProvider);
    return DataProvider;
}());

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_customer_data_customer_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_customer_delivery_customer_delivery__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_customer_properties_customer_properties__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, data) {
        var _this = this;
        this.data = data;
        this.data.getOptions('navigate').then(function (navigate) {
            if (navigate) {
                switch (navigate) {
                    case "1":
                        //this.rootPage = LoginPage;      
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_customer_data_customer_data__["a" /* CustomerDataPage */];
                        break;
                    case "2":
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_customer_delivery_customer_delivery__["a" /* CustomerDeliveryPage */];
                        break;
                    case "3":
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_customer_properties_customer_properties__["a" /* CustomerPropertiesPage */];
                        break;
                    case "4":
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */];
                        break;
                    default:
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
                        break;
                }
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
            }
        });
        //    this.dataService.getData().then((userData) => {
        //    this.temp = JSON.parse(userData);       
        //if(this.temp != null){        
        //   this.rootPage = TabsPage;    
        //}
        //else{  
        //  } 
        //});
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h2>Welcome to Ionic!</h2>\n  <p>\n    This starter project comes with simple tabs-based layout for apps\n    that are going to primarily use a Tabbed UI.\n  </p>\n  <p>\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n    update any existing page or create new pages.\n  </p>\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_data_customer_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customer_delivery_customer_delivery__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__customer_properties_customer_properties__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__orders_orders__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerPage = /** @class */ (function () {
    function CustomerPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CustomerPage.prototype.itemSelected = function (site) {
        switch (site) {
            case "data":
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__customer_data_customer_data__["a" /* CustomerDataPage */]);
                break;
            case "delivery":
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__customer_delivery_customer_delivery__["a" /* CustomerDeliveryPage */]);
                break;
            case "properties":
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__customer_properties_customer_properties__["a" /* CustomerPropertiesPage */]);
                break;
            case "orders":
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__orders_orders__["a" /* OrdersPage */]);
                break;
        }
    };
    CustomerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/customer/customer.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\nProfil\n    </ion-title>\n\n  \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content> \n<ion-card class="no-padding">\n    <button class="customer" ion-button full color="secondary" icon-start (click)="itemSelected(\'data\')">\n      <ion-icon name="contacts" item-start></ion-icon>\n      Mé údaje\n    </button> \n    <button class="customer" ion-button full color="secondary"  icon-start  (click)="itemSelected(\'delivery\')">\n      <ion-icon name="cash" item-start></ion-icon>\n      Doprava a platba\n    </button>\n\n    <button class="customer" ion-button full color="secondary" icon-start (click)="itemSelected(\'properties\')">\n      <ion-icon name="list-box" item-start></ion-icon>\n		Mé přislušenství       \n    </button>  \n     <button class="customer" ion-button full color="secondary" icon-start (click)="itemSelected(\'properties\')">\n      <ion-icon name="list-box" item-start></ion-icon>\n		Oblíbené      \n    </button>  \n     <button class="customer" ion-button full color="secondary" icon-start (click)="itemSelected(\'orders\')">\n      <ion-icon name="card" item-start></ion-icon>\n    Mé objednávky       \n    </button>  \n    </ion-card>\n      <ion-card class="no-padding">\n     <img src="img/maxresdefault.jpg">\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/customer/customer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], CustomerPage);
    return CustomerPage;
}());

//# sourceMappingURL=customer.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_modal_window_modal_window__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_customer_delivery_customer_delivery__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_customer_customer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_data__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
*validatece html
*   <ion-item *ngIf="!formValidatorUser.controls.fu_phone.valid  && (formValidatorUser.controls.fu_phone.touched || saveCustomer)">
*                <p>Prosím vložte fu_phone</p>
 *   </ion-item>
*
 * Generated class for the CustomerDataPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerDataPage = /** @class */ (function () {
    function CustomerDataPage(modalCtrl, navCtrl, navParams, dataService, formBuilder) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.lastData = [];
        this.getMachinesList = [];
        this.formValidatorUser = formBuilder.group({
            fu_jmeno: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            fu_phone: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(9), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            fu_ulice: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            fu_mesto: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            fu_firma: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+$')])],
            fir_sur: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$')])],
            fu_psc: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
            fu_ico: [''],
            fu_dic: [''],
            firma: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+$')])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(9), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
            ulice: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+ [a-zA-Z0-9-]+$')])],
            mesto: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+$')])],
            psc: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]*')])],
        });
        if (this.navParams.get('data')) {
            this.lastData = this.navParams.get('data');
        }
        else {
            this.dataService.getData().then(function (userdata) {
                if (userdata) {
                    _this.lastData = JSON.parse(userdata);
                }
            });
        }
    }
    CustomerDataPage.prototype.saveCustomer = function () {
        var _this = this;
        this.dataService.save(this.lastData);
        this.dataService.getOptions('navigate').then(function (navigate) {
            if (navigate == '1') {
                _this.dataService.saveOptions('2', 'navigate');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_customer_delivery_customer_delivery__["a" /* CustomerDeliveryPage */], {});
            }
            else {
                _this.dataService.saveOptions('1', 'navigate');
                var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_modal_window_modal_window__["a" /* ModalWindowPage */], {});
                profileModal.present();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_customer_customer__["a" /* CustomerPage */]);
            }
        });
    };
    CustomerDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-data',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/customer-data/customer-data.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Mé údaje\n    </ion-title>\n\n    <ion-buttons>\n      <button ion-button clear large navPop>\n        <ion-icon name="arrow-round-back"></ion-icon> Zpět\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n<ion-card>  \n<ion-card-content>\n<form [formGroup]="formValidatorUser">\n<ion-list>\n  <ion-item> \n    <ion-label floating>Jméno a příjmení* </ion-label>    \n    <ion-input formControlName="fu_jmeno" [(ngModel)]="lastData.fu_jmeno" type="text" ></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Email*</ion-label>\n    <ion-input  formControlName="email" type="text" [(ngModel)]="lastData.email"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Telefonní číslo*</ion-label>\n    <ion-input formControlName="fu_phone" type="text" [(ngModel)]="lastData.fu_phone"></ion-input>\n  </ion-item> \n  <ion-item>\n    <ion-label floating>Ulice a číslo popisné*</ion-label>\n    <ion-input formControlName="fu_ulice" type="text" [(ngModel)]="lastData.fu_ulice"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Město*</ion-label>\n    <ion-input formControlName="fu_mesto" type="text" [(ngModel)]="lastData.fu_mesto"></ion-input>\n  </ion-item>\n    <ion-item>\n    <ion-label floating>PSČ</ion-label>\n    <ion-input formControlName="fu_psc"  type="text" [(ngModel)]="lastData.fu_psc"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Firma</ion-label>\n    <ion-input formControlName="fu_firma" type="text" [(ngModel)]="lastData.fu_firma"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>IČO</ion-label>\n    <ion-input formControlName="fu_ico" type="text" [(ngModel)]="lastData.fu_ico"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>DIČ</ion-label>\n    <ion-input formControlName="fu_dic" type="text" [(ngModel)]="lastData.fu_dic"></ion-input>\n  </ion-item>\n   <ion-item>\n    <ion-label floating>Jméno a příjmeni</ion-label>\n    <ion-input formControlName="fir_sur" type="text"></ion-input>\n  </ion-item> \n  <ion-item>\n    <ion-label floating>Firma</ion-label>\n    <ion-input formControlName="firma" type="text" [(ngModel)]="lastData.firma"></ion-input>\n  </ion-item> \n  <ion-item>\n    <ion-label floating>Telefonní číslo</ion-label>\n    <ion-input formControlName="phone" type="text" [(ngModel)]="lastData.phone"></ion-input>\n  </ion-item> \n  <ion-item>\n    <ion-label floating>Ulice a číslo popisné</ion-label>\n    <ion-input formControlName="ulice" type="text" [(ngModel)]="lastData.ulice"></ion-input>\n  </ion-item> \n  <ion-item>\n    <ion-label floating>Město</ion-label>\n    <ion-input formControlName="mesto" type="text" [(ngModel)]="lastData.mesto"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>PSČ</ion-label>\n    <ion-input formControlName="psc"  type="text" [(ngModel)]="lastData.psc"></ion-input>\n  </ion-item>\n  \n</ion-list>\n <button ion-button full (click)="saveCustomer()">ULOŽIT</button> \n</form  >\n </ion-card-content>\n</ion-card>\n</ion-content>'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/customer-data/customer-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], CustomerDataPage);
    return CustomerDataPage;
}());

//# sourceMappingURL=customer-data.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerDeliveryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_customer_properties_customer_properties__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_customer_customer__ = __webpack_require__(35);
// udělat window s validací pro nastavení doprav
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CustomerDeliveryPage = /** @class */ (function () {
    function CustomerDeliveryPage(navCtrl, http, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.data = data;
        this.payment = 0;
        this.deliverylist = [];
        this.paymentlist = [];
        this.http.get('https://www.svycarskekavovary.cz?getdelivery=1').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.deliverylist = _this.initOptions(data);
            //načteni dopravy ze storage
            _this.data.getOptions("delivery").then(function (delivery) {
                console.log(delivery);
                if (Number(delivery) > 0)
                    _this.delivery = Number(delivery);
                else
                    _this.delivery = Number(_this.deliverylist[0].id);
                _this.http.get('https://www.svycarskekavovary.cz?getPayment=1&' + _this.delivery).map(function (res) { return res.json(); }).subscribe(function (data) {
                    _this.paymentlist = _this.initOptions(data);
                    _this.data.getOptions("payment").then(function (payment) {
                        if (Number(payment) > 0)
                            _this.payment = Number(payment);
                        else
                            _this.payment = _this.paymentlist[0].id;
                    });
                });
            });
        });
    }
    CustomerDeliveryPage.prototype.initOptions = function (data) {
        var list = [];
        var i = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            list[i] = {
                id: item.id,
                name: item.title,
                descr: item.descr,
                price: item.price,
            };
            i++;
        }
        return list;
    };
    CustomerDeliveryPage.prototype.saveOptions = function () {
        var _this = this;
        this.data.saveOptions(this.delivery, "delivery");
        this.data.saveOptions(this.payment, "payment");
        this.data.getOptions('navigate').then(function (navigate) {
            if (navigate == '2') {
                _this.data.saveOptions('3', 'navigate');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_customer_properties_customer_properties__["a" /* CustomerPropertiesPage */]);
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_customer_customer__["a" /* CustomerPage */]);
            }
        });
    };
    CustomerDeliveryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-delivery',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/customer-delivery/customer-delivery.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button icon-only menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Doprava a platba\n    </ion-title>\n\n    <ion-buttons>\n      <button ion-button clear large navPop>\n        <ion-icon name="arrow-round-back"></ion-icon> Zpět\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n<ion-content>\n<ion-card>\n  <ion-card-header>\n  <strong>Doprava</strong>\n  </ion-card-header>\n     <ion-card-content>\n<ion-list radio-group [(ngModel)]="delivery">\n\n  <div class="radio-item" *ngFor="let item of deliverylist" >\n    <p>{{item.name}} - {{item.price}} Kč<br>\n      <span>{{item.descr}}</span>  \n    </p> \n    <ion-radio  value="{{item.id}}"></ion-radio>  \n    \n  </div> \n\n</ion-list>\n   </ion-card-content>\n</ion-card>\n<ion-card>\n  <ion-card-header>\n  <strong>Platba</strong>\n  </ion-card-header>\n   <ion-card-content>\n<ion-list radio-group [(ngModel)]="payment">\n\n  <div class="radio-item" *ngFor="let item of paymentlist" >\n    <p>{{item.name}} - {{item.price}} Kč<br>\n      <span>{{item.descr}}</span>  \n    </p> \n    <ion-radio  value="{{item.id}}"></ion-radio>  \n    \n  </div> \n\n</ion-list>\n <button ion-button full (click)="saveOptions()">ULOŽIT</button>\n  </ion-card-content>\n</ion-card> \n\n</ion-content>\n '/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/customer-delivery/customer-delivery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */]])
    ], CustomerDeliveryPage);
    return CustomerDeliveryPage;
}());

//# sourceMappingURL=customer-delivery.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerPropertiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_customer_customer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CustomerPropertiesPage = /** @class */ (function () {
    function CustomerPropertiesPage(app, navCtrl, navParams, http, data) {
        var _this = this;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.data = data;
        this.listArray = [];
        this.listProducts = [];
        this.data.getOptions("machines").then(function (machines) {
            _this.ids = machines;
        });
        this.http.get('https://www.svycarskekavovary.cz?getproducts=1&onlykavovars=1').map(function (res) { return res.json(); }).subscribe(function (data) {
            _this.listProducts = _this.initItems(data.products);
        });
    }
    CustomerPropertiesPage.prototype.onChangeMachine = function (nodeId) {
        console.log(nodeId);
        console.log(this.listProducts);
    };
    CustomerPropertiesPage.prototype.initItems = function (data) {
        console.log(this.ids);
        var list = [];
        var chech;
        var i = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            chech = false;
            if (this.ids.search(item.id) >= 0) {
                chech = true;
            }
            list[i] = {
                id: item.id,
                price: item.price,
                title: item.title,
                selected: chech
            };
            i++;
        }
        return list;
    };
    CustomerPropertiesPage.prototype.saveOptions = function () {
        this.ids = '';
        for (var _i = 0, _a = this.listProducts; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.selected) {
                this.listArray.push(item.id);
            }
        }
        this.ids = this.listArray.join(';');
        this.data.saveOptions(this.ids, "machines");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_customer_customer__["a" /* CustomerPage */]);
    };
    CustomerPropertiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-customer-properties',template:/*ion-inline-start:"/Users/michalnosil/ionic/jura/src/pages/customer-properties/customer-properties.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Mé kávovary</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>  \n<ion-grid>\n  <ion-list>\n    <ion-item class="item-basket" *ngFor="let item of listProducts">\n          <h4>{{item.title}}</h4>          \n        <ion-label>{{item.title}}</ion-label>\n          <ion-checkbox [(ngModel)]="item.selected" color="Royal"></ion-checkbox>\n\n    </ion-item>     \n  </ion-list> \n</ion-grid>\n <button ion-button full (click)="saveOptions()">ULOŽIT</button>\n</ion-content>'/*ion-inline-end:"/Users/michalnosil/ionic/jura/src/pages/customer-properties/customer-properties.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */]])
    ], CustomerPropertiesPage);
    return CustomerPropertiesPage;
}());

//# sourceMappingURL=customer-properties.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map