angular.module('uikit',['uikit.components','uikit.components.breadcrumb','uikit.components.cart','uikit.components.creditCardForm','uikit.components.filter','uikit.components.installmentTable','uikit.components.listManager','uikit.components.menu','uikit.components.navbar','uikit.components.orderSummary','uikit.components.pagination','uikit.components.paymentForm','uikit.components.paymentFormManager','uikit.components.productInfo','uikit.components.productItem','uikit.components.productOptions','uikit.components.productPrice','uikit.components.search','uikit.components.sort','uikit.components.userinfo','uikit.core','ngMaterial','ngMessages']);
(function() {

	'use strict';

	/**
	* Initialization for uikit-core
	*/

	angular.module('uikit.core', ['ngMaterial'])
		/*
		.config(function ($mdThemingProvider, $mdIconProvider) {
			//$mdThemingProvider.alwaysWatchTheme(true);
			$mdThemingProvider.theme('altTheme')
				.primaryPalette('purple') // specify primary color, all other color intentions will be inherited from default
				.accentPalette('orange');

			$mdThemingProvider.theme('docs-dark', 'default')
				.primaryPalette('orange')
				.dark();

			$mdIconProvider
				.iconSet('action', '/uikit/images/icons/svg-sprite-action.svg', 24)
				.iconSet('navigation', '/uikit/images/icons/svg-sprite-navigation.svg', 24)
				.iconSet('content', '/uikit/images/icons/svg-sprite-content.svg', 24)
				.iconSet('communication', '/uikit/images/icons/svg-sprite-communication.svg', 24)
				.iconSet('maps', '/uikit/images/icons/svg-sprite-maps.svg', 24)
				.iconSet('av', '/uikit/images/icons/svg-sprite-av.svg', 24)
				.iconSet('extra', '/uikit/images/icons/extra.svg');
		})*/
		.run(function($log){
		  $log.debug("uikit + ngMaterial running...");
		})
		.directive('sfTemplate', function ($compile) {
			return {
				restrict: 'A',
				//scope: {
				//  template: '=sfTemplate',
				//  item: '=ngModel'
				//},
				link: function (scope, element, attrs) {

					//if (scope.template) {
					//  element.html(scope.template);
					//  $compile(element.contents())(scope);
					//}

					//console.log(attrs.sfTemplate, attrs.ngModel);

					//console.log(attrs.ngModel, scope.$parent[attrs.ngModel]);
					//console.log(attrs.sfTemplate, scope[attrs.sfTemplate]);
					//console.log(attrs.sfTemplate, scope);
					//console.log(attrs.sfTemplate, scope.$eval(attrs.sfTemplate));
					//var t = scope.$parent.$eval(attrs.sfTemplate);

					var t = scope.$eval(attrs.sfTemplate);
					if (t) {
						//console.log(t, scope.$parent);
						element.html(t);
						//console.log(element.contents());
						//$compile(element.contents())(scope.$parent);
						$compile(element.contents())(scope);
					}
				}
			};
		})
		.directive('ngIncludeReplace', function () {
			return {
				require: 'ngInclude',
				restrict: 'A',
				link: function (scope, el, attrs) {
					el.replaceWith(el.children());
				}
			};
		})
		.filter('offset', function () {
			return function (input, start) {
				start = parseInt(start, 10);
				return input.slice(start);
			};
		})
		.controller('listController', function ($filter) {

			var _self = this;

			this.doRequest1 = function (items) {

				if (this.config.cliensidePagination) {

					this.items = items;

					this.allItems = items;
					this.totalItems = items.length;
					//this.filter();
					return;
				}

				this.items = items;
				this.totalItems = items.length;






				/*
				var data = {
					//multi: true
					cliensidePagination: this.config.cliensidePagination,
					selectedFilterItems: this.selectedFilter.filterItems,
					search: this.search.$,
					orderBy: this.orderBy,
					reverse: this.reverse,
					itemsPerPage: this.itemsPerPage,
					currentPage: this.currentPage
				};

				//console.log('doRequest', this.config);
				//console.log('doRequest', data);

				Restangular.all(this.config.url).getList(data).then(function (response) {

					//console.log('doRequest', response);

					if(response.listOptions) {

						if(response.listOptions.hasOwnProperty('cliensidePagination')) {

							_self.config.cliensidePagination = response.listOptions.cliensidePagination;
						}
						
						if(response.listOptions.hasOwnProperty('totalItems')) {
							_self.totalItems = response.listOptions.totalItems;
						}
					}

					var r = response.list || response;

					if(_self.config.cliensidePagination) {

						_self.allItems = r;
						_self.totalItems = r.length;
						_self.filter();
						return;
					}

					_self.items = r;
				});
				*/
			};

			this.getItems = function (filterItems, search, order, currentPage) {
				//asd

				if (this.config.cliensidePagination) {
					this.allItems = r;
					this.totalItems = r.length;
					this.filter();
					return;
				}
				this.items = r;

				//process order --- ng-repeat="item in items | filter:search | orderBy:orderBy:reverse | offset:(currentPage-1)*itemsPerPage | limitTo:itemsPerPage"
				//--------------------------------------------------------------------------------------
				//1. filter:filter
				//2. filter:search
				//3. orderby
				//------------------------ pagination
				//4. offset
				//5. limit

				console.log(currentPage);
			};








			//filter
			this.selectFilter = function (filter) {
				this.selectedFilter = angular.copy(filter);
				//console.log('selectFilter', this.selectedFilter);
				this.filter();
			};

			this.selectDefaultFilter = function () {
				this.selectedFilter = angular.copy(this.filters[0]);
				//console.log('selectDefaultFilter', this.selectedFilter);
				this.filter();
			};

			this.removeFilterItem = function (filterItem) {
				var index = this.selectedFilter.filterItems.indexOf(filterItem);
				if (index > -1) {
					this.selectedFilter.filterItems.splice(index, 1);
					//console.log('removeFilterItem', this.selectedFilter);
					if (this.selectedFilter.filterItems.length === 0) {
						this.selectDefaultFilter();
						return;
					}
					this.filter();
				}
			};

			this.loadFilter = function () {
				/*
				//TODO:Load filter dynamically
				this.filters = [
					{ id: '0', name: this.config.defaultFilterName, filterItems: [] },
					{ id: '1', name: 'elmalar', filterItems: [ 
						{column: 'name', operator: 'eq', value: 'elma1'}
						,{column: 'name', operator: 'eq', value: 'elma2'} 
					]},
					{ id: '2', name: '100 TL\'den buyuk siparisler', filterItems: [ 
						{column: 'sku', operator: 'eq', value: 'asd'}, 
						{column: 'name', operator: 'neq', value: 'asd'}, 
						{column: 'name', operator: 'sm', value: 'asd'},
						{column: 'name', operator: 'nsm', value: 'asd'},
						{column: 'name', operator: 'gt', value: 'asd'},
						{column: 'name', operator: 'gteq', value: 'asd'},
						{column: 'name', operator: 'lt', value: 'asd'},
						{column: 'name', operator: 'lteq', value: 'asd'},
						{column: 'name', operator: 'btw', value: '1', value2: '5'},
						{column: 'name', operator: 'sw', value: 'asd'},
						{column: 'name', operator: 'ew', value: 'asd'}
					]},
					{ id: '3', name: 'Ucretsiz kargo kampanyasina ait siparisler', filterItems: [ {column: 'sku', operator: 'eq', value: 'asd'} ]}
				];
				*/
			};

			this.saveFilter = function (filter) {
				//console.log('saveFilter', filter);
				if (filter.id) {
					//update
					if (filter.id === '0') {
						return false;
					}

					//TODO:save to DB
					for (var i = 0; i < this.filters.length; i++) {

						if(this.filters[i].id === filter.id) {

							this.filters[i] = filter;
							this.selectFilter(filter);
							return true;
						}
					}
					return false;
				}
				else {
					//add
					//TODO:save to DB
					this.filters.push(filter);
					this.selectFilter(filter);
					return true;
				}
				return false;
			};

			this.removeFilter = function (filter) {
				//console.log('removeFilter', filter);
				if (filter.id === '0') {
					return false;
				}
				//TODO:save to DB
				for (var i = 0; i < this.filters.length; i++) {

					if (this.filters[i].id === filter.id) {
						this.selectDefaultFilter();
						this.filters.splice(i, 1);
						return true;
					}
				}
				return false;
			};

			this.searchChanged = function () {
				//console.log('searchChanged', this.search);
				this.filter();
			};

			this.filter = function () {

				//console.log('filter');
				if (this.config.cliensidePagination) {
					
					//process order --- ng-repeat="item in items | filter:search | orderBy:orderBy:reverse | offset:(currentPage-1)*itemsPerPage | limitTo:itemsPerPage"
					//--------------------------------------------------------------------------------------
					//1. filter:filter
					//2. filter:search
					//3. orderby
					//------------------------ pagination
					//4. offset
					//5. limit

					var items = this.allItems;

					items = $filter('filter')(items, function (item) {
						
						for (var i = 0; i < this.selectedFilter.filterItems.length; i++) {

							var filterItem = this.selectedFilter.filterItems[i];
							var value = item[filterItem.column];

							if(!operators.check(value, filterItem.operator, filterItem.value, filterItem.value2)) {
								return false;
							}
						}
						return true;
					}.bind(this));

					//search
					items = $filter('filter')(items, this.search);

					this.currentPage = 1;
					this.itemsFiltered = items;
					this.totalItems = items.length;

					this.sort();
					return;
				}
				this.doRequest();
			};

			//sort
			this.sortChanged = function (column) {
				//console.log('sortChanged', column);
				if (column.substr(column.length - 1) === "-") {
					this.orderBy = column.substr(0, column.length - 1);
					this.reverse = true;
					this.sort();
				}
				else if (this.orderBy === column) {
					this.reverse = !this.reverse;
					this.sort();
				}
				else {
					this.orderBy = column;
					this.reverse = false;
					this.sort();	
				}
			};

			this.sort = function () {
				//console.log('sort', this.orderBy, this.reverse);
				if (this.config.cliensidePagination) {
					this.itemsSorted = $filter('orderBy')(this.itemsFiltered, this.orderBy, this.reverse);
					this.paginate();
					return;
				}
				this.doRequest();
			};

			//pagination
			this.itemsPerPageChanged = function () {
				//console.log('itemsPerPageChanged', this.itemsPerPage);
				this.currentPage = 1;
				this.paginate();
			};

			this.pageChanged = function (page) {
				//console.log('pageChanged', page, this.itemsPerPage);
				this.paginate();
			};

			this.paginate = function() {
				//console.log('paginate');
				if (this.config.cliensidePagination) {
					var items = this.itemsSorted;
					items = $filter('offset')(items, (this.currentPage - 1) * this.itemsPerPage);
					items = $filter('limitTo')(items, this.itemsPerPage);
					this.items = items;
					return;
				}
				this.doRequest();
			};

			//action
			this.selectedItemActionFilter = function(action) {
				return action.apply === 'selected' || action.apply === 'all';
			};

			this.itemActionFilter = function(action) {
				return action.apply === 'item' || action.apply === 'all';
			};

			this.actionSelected = function (action) {
				var selectedItems = $filter('filter')(this.items, { selected: true });
				//console.log('actionSelected', action, selectedItems);
				action.fn(selectedItems);
			};

			//this.setConfig = function (config) {
			//	this.config = angular.extend({}, defaultListConfig, config);
			//};
			this.config = {};
			this.columns = [];
			this.items = [];
			this.itemsFiltered = [];
			this.itemsSorted = [];
			this.allItems = [];
			this.totalItems = 0;
			this.orderBy = '_id';
			this.reverse = false;
			this.itemsPerPage = 5;
			this.currentPage = 1;
			this.search = '';
			this.filters = [
				{ id: '0', name: 'Genel', filterItems: [] }
				//{ id: '0', name: $translate.instant(this.config.url + '.' + this.config.defaultFilterName), filterItems: [] }
				//{ id: '0', name: this._scope.config.defaultFilterName, filterItems: [] }
			];
			this.selectedFilter = angular.copy(this.filters[0]);
		});

	angular.module('uikit.components', ['uikit.core']);
	angular.module('uikit.snippets', ['uikit.core']);





	

})();
(function(){
'use strict';
angular.module('uikit.components.breadcrumb', [])
  .directive('sfBreadcrumb', sfBreadcrumbDirective);


function sfBreadcrumbDirective(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/breadcrumb/breadcrumb.tmpl.html',
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope:{
			navitems: '=ngModel'
		}
	};
}
})();
(function(){

	'use strict';

	angular.module('uikit.components.cart', [])
		.directive('sfCart', function () {
			return {
				restrict: 'E',
				templateUrl: 'app/components/cart/cart.tmpl.html',
				scope: {
					order: '=ngModel',
					columns: '=?',
					totals: '=?',
					actions: '=?',
					showHeader: '@',
					showGroupAction: '@',
					removeItem: '&'
				},
				bindToController: true,
				controller: function () {
					this.triggerActionCallback = function (cb) {
						var items = this.order.products.filter(function (p) {
							return p.selected === true;
						});
						if (items.length) {
							cb(items);
						}
					};
				},
				controllerAs: 'ctrl',
				link: function (scope, element, attrs) {
					if (!attrs.columns) {
						scope.ctrl.columns = [
							{ name: 'image', title: 'Image', width: '10', template: '<img src="{{ item.image }}" />' },
							{ name: 'name', title: 'Name' },
							{ name: 'qty', title: 'Qty', width: '15', template: '<md-input-container ng-if="!item.qtyOptions"><label>Quantity</label><input ng-model="item.qty"></md-input-container><md-select ng-if="item.qtyOptions" ng-model="item.qty" placeholder="Select quantity"><md-option ng-repeat="qtyOption in item.qtyOptions" ng-value="qtyOption">{{ qtyOption }}</md-option></md-select>' },
							{ name: 'total', title: 'Total', width: '10', template: '{{ item.price * item.qty | currency }}' }
						];
					}

					if (scope.ctrl.showGroupAction === 'true') {
						scope.ctrl.columns.unshift({
							name: 'select',
							title: '',
							width: '4',
							template: '<md-checkbox ng-model="item.selected" aria-label="Select item" class="sf-table__checkbox"></md-checkbox>'
						});
					}

					if (!attrs.totals) {
						scope.ctrl.totals = [
							{
								name: 'total',
								title: 'Toplam',
								fn: function (order) {
									return order.products.reduce(function (returned, current) {
										return returned + (current.price * current.qty);
									}, 0);
								}
							}
						];
					}
					scope.ctrl.actions = scope.ctrl.actions || [];
					if (attrs.removeItem) {
						scope.ctrl.actions.unshift({
							name: 'remove',
							title: 'Remove',
							icon: 'close',
							cb: function (items) {
								scope.ctrl.removeItem({ items: items });
							}
						});
					}
					if (scope.ctrl.actions.length) {
						scope.ctrl.columns.push({
							name: 'actions',
							title: '',
							width: '8',
							template: '<md-menu md-offset="0 0"> \
							<md-button ng-click="$mdOpenMenu()" class="md-icon-button" aria-label="Open sample menu"> \
							<md-icon md-menu-origin>more_vert</md-icon></md-button> \
							<md-menu-content><md-menu-item ng-repeat="action in ctrl.actions"> \
							<md-button class="md-default"  aria-label="{{ action.title }}" ng-click="action.cb(item)"> \
							<md-icon aria-hidden="true" md-menu-align-target>{{ action.icon }}</md-icon>{{action.title}}</md-button> \
							</md-menu-item></md-menu-content></md-menu>'
						});
					}
				}
			};
		});

})();
(function(){

	'use strict';

	angular.module('uikit.components.creditCardForm', [])
		
		//https://github.com/jessepollak/card
		//https://github.com/gavruk/angular-card/blob/master/src/card.js

		.directive('cardNumberValidator', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				scope: {
					cardNumberValidator: '='
				},
				link: function(scope, element, attrs, ctrl) {
					ctrl.$validators.cardNumberValidator = function (value) {
						if (value) {
							var cardNumber = value.replace(/\s/g, '');
							var validator = scope.cardNumberValidator;
							if (angular.isString(validator) || angular.isNumber(validator)) {
								var valid = cardNumber.substring(0, validator.toString().length) === validator.toString();
								if (valid) {
									return Payment.fns.validateCardNumber(value);
								}
							}
							else if (angular.isArray(validator)) {
								var i = 0;
								for (i = 0; i < validator.length; i++) {
									var valid = cardNumber.substring(0, validator[i].toString().length) === validator[i].toString();
									if (valid) {
										return Payment.fns.validateCardNumber(value);
									}
								}
							}
							else {
								return Payment.fns.validateCardNumber(value);
							}
							return false;
						}
						return false;
					};
				}
			};
		})

		.directive('cardExpiryValidator', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, element, attrs, ctrl) {
					ctrl.$validators.cardExpiryValidator = function (value) {
						if (value) {
							var expiry = Payment.fns.cardExpiryVal(value);
							return Payment.fns.validateCardExpiry(expiry.month, expiry.year);
						}
						return false;
					};
				}
			};
		})

		.directive('cardCvcValidator', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, element, attrs, ctrl) {
					ctrl.$validators.cardCvcValidator = function (value) {
						if (value) {
							return Payment.fns.validateCardCVC(value);
						}
						return false;
					};
				}
			};
		})
		
		.directive('sfCreditCardForm', function () {
			return {
				restrict: 'E',
				require: '?ngModel',
				templateUrl: 'app/components/creditCardForm/creditCardForm.tmpl.html',
				scope: {
					card: '=ngModel',
					form: '=',
					preview: '@',
					onCreditCardChange: '&'
				},
				bindToController: true,
				controller: function () {
					var _self = this;
					this.structure = {
						row: [
							{
								inputContainer: {
									label: 'Full name',
									input: {
										type: 'text',
										name: 'name',
										ngModel: 'data.name',
										required: '',
										validationTexts: {
											required : 'Full name is required. Please fill the input.'
										}
									}
								}
							},
							{
								inputContainer: {
									label: 'Card number',
									input: {
										type: 'text',
										name: 'number',
										ngModel: 'data.number',
										ngChange: _self.onCreditCardChange,
										required: '',
										cardNumberValidator: '',
										validationTexts: {
											required : 'Card number is required. Please fill the input.',
											cardNumberValidator : 'The card number is not valid!'
										}
									}
								}
							},
							{
								inputContainer: {
									label: 'Expiry',
									input: {
										type: 'text',
										name: 'expiry',
										ngModel: 'data.expiry',
										ngChange: _self.onCreditCardChange,
										required: '',
										cardExpiryValidator: '',
										validationTexts: {
											required : 'Expiry is required. Please fill the input.',
											cardExpiryValidator : 'Expiry is not valid!'
										}
									}
								}
							},
							{
								inputContainer: {
									label: 'Cvc',
									input: {
										type: 'text',
										name: 'cvc',
										ngModel: 'data.cvc',
										ngChange: _self.onCreditCardChange,
										autocomplete: 'off',
										required: '',
										cardCvcValidator: '',
										validationTexts: {
											required : 'Cvc is required. Please fill the input.',
											cardCvcValidator : 'Cvc is not valid!'
										}
									}
								}
							}
						]
					};
				},
				controllerAs: 'ctrl',
				link: function (scope, element, attrs, ngModelCtrl) {
					if (ngModelCtrl) {
						ngModelCtrl.$formatters.push(function (v) {
							
							v.name = v.name || '';
							v.number = v.number || '';
							v.expiry = v.expiry || '';
							v.cvc = v.cvc || '';

							v.number = Payment.fns.formatCardNumber(v.number);

							if (!Payment.fns.validateCardNumber(v.number)) {
								v.number = '';
							}

							var expiry = Payment.fns.cardExpiryVal(v.expiry);
							if (!Payment.fns.validateCardExpiry(expiry.month, expiry.year)) {
								v.expiry = '';
							}

							if (!Payment.fns.validateCardCVC(v.cvc)) {
								v.cvc = '';
							}
							return v;
						});

						//ngModelCtrl.$parsers.push(function (v) {
						//	console.log('parsers', v);
						//	return v;
						//});

						if (scope.ctrl.card && scope.ctrl.card.number) {
							scope.ctrl.onCreditCardChange();
						}
					}

					var simulateEvents = function () {
						//console.log('watchMAIN');
						//http://stackoverflow.com/questions/446892/how-to-find-event-listeners-on-a-dom-node
						//WebKit Inspector in Chrome or Safari browsers now does this. It will display the event listeners for a DOM element when you select it in the Elements pane.
						//http://www.w3schools.com/jsref/met_document_addeventlistener.asp
						//https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
						//http://stackoverflow.com/questions/18823872/jquery-dispatchevent-wrapper-method
						//https://github.com/sandeep45/betterTrigger
						//https://learn.jquery.com/events/triggering-event-handlers/
						angular.element('input[name="name"]').simulate('keyup');
						angular.element('input[name="number"]').simulate('keyup');
						angular.element('input[name="expiry"]').simulate('keyup');
						angular.element('input[name="cvc"]').simulate('keyup');
						scope.ctrl.onCreditCardChange();
					}

					scope.$watch('ctrl.card', simulateEvents);

					element.ready(function () {
						var card = new Card({
							form: 'form[name="creditCardForm.form"]',
							container: '.card-wrapper',
							width: 200,
							formatting: true,
							debug: true
						});
						simulateEvents();
					});
				}
			};
		});

})();
(function(){
'use strict';
angular.module('uikit.components.filter', [])
  .directive('sfFilter', sfFilterDirective);


function sfFilterDirective(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/filter/filter.tmpl.html'
	};
}
})();
(function(){

	'use strict';

	angular.module('uikit.components.installmentTable', [])

		.directive('sfInstallmentTable', function () {
			return {
				restrict: 'E',
				templateUrl: 'app/components/installmentTable/installmentTable.tmpl.html',
				scope: {
					amount: '=ngModel',
					paymentOptions: '=',
					onSelectOption: '&'
				},
				bindToController: true,
				controller: function () {
					this.getAmount = function (installment) {
						return this.amount + (this.amount * installment.rate / 100);
					};
				},
				controllerAs: 'ctrl',
				link: function (scope, element, attrs) {
					scope.onSelectOption = false;
					if (attrs.onSelectOption) {
						scope.onSelectOption = true;
					}
				}
			};
		});

})();
(function(){

	'use strict';

	angular.module('uikit.components.listManager', [])
		
		.directive('sfListManager', function () {
			return {
				restrict: 'E',
				templateUrl: 'app/components/listManager/listManager.tmpl.html',
				scope: {
					items: '=ngModel',
					showItemLayout: '@',
					itemLayout: '@',
					onItemLayoutChange: '&',
					
					sortOptions: '=',
					sort: '=',

					onSortChange: '&',

					filter: '=',
					onFilterChange: '&',

					actionButtons: '='
				},
				bindToController: true,
				controller: function () {
					this.onActionClick = function (cb) {
						cb(this.items.filter(function (item) {
							return item.selected;
						}));
					};
					this.getIcon = function (action) {
						return action.toLowerCase().replace(/\s/g, '_');
					};
				},
				controllerAs: 'ctrl'
			};
		});

})();
(function(){
'use strict';
angular.module('uikit.components.menu', [])
  .directive('sfMenu', sfMenuDirective);


function sfMenuDirective(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/menu/menu.tmpl.html',
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			item: '=ngModel',
		}
	};
}
})();
(function(){
'use strict';
angular.module('uikit.components.navbar', [])
  .directive('sfNavbar', sfNavbarDirective);


function sfNavbarDirective(){
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'app/components/navbar/navbar.tmpl.html',
			controller: function(){},
			controllerAs: 'ctrl',
			bindToController: true,
			scope: {
				item: '=ngModel'
			}
		};
	}
})();
(function(){
'use strict';
angular.module('uikit.components.orderSummary', [])
  .directive('sfOrderSummary', sfOrderSummaryDirective);


function sfOrderSummaryDirective($mdTheming){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/orderSummary/orderSummary.tmpl.html',
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			order: '=ngModel'
		}
	};
}
})();
(function(){
	
	'use strict';
	
	//cloned from ui.bootstrap.pagination
	angular.module('uikit.components.pagination', [])

	.controller('PaginationController', ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {
	  var self = this,
	      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
	      setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

	  this.init = function(ngModelCtrl_, config) {
	    ngModelCtrl = ngModelCtrl_;
	    this.config = config;

	    ngModelCtrl.$render = function() {
	      self.render();
	    };

		$scope.itemsPerPageOptions = null;
		if ($attrs.itemsPerPageOptions) {
			$scope.$parent.$watch($parse($attrs.itemsPerPageOptions), function(value) {
				$scope.itemsPerPageOptions = value;
			});
		}
		
	    if ($attrs.itemsPerPage) {
	      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
	        self.itemsPerPage = parseInt(value, 10);
	        $scope.totalPages = self.calculateTotalPages();
	      });
	    } else {
	      this.itemsPerPage = config.itemsPerPage;
	    }
	  };

	  this.calculateTotalPages = function() {
	    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
	    return Math.max(totalPages || 0, 1);
	  };

	  this.render = function() {
	    $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
	  };

	  $scope.selectPage = function(page) {
	    if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {
	      ngModelCtrl.$setViewValue(page);
	      ngModelCtrl.$render();
	      $scope.onPageChanged({page: page});
	    }
	  };

	  $scope.getText = function( key ) {
	    return $scope[key + 'Text'] || self.config[key + 'Text'];
	  };
	  $scope.noPrevious = function() {
	    return $scope.page === 1;
	  };
	  $scope.noNext = function() {
	    return $scope.page === $scope.totalPages;
	  };

	  $scope.$watch('totalItems', function() {
	    $scope.totalPages = self.calculateTotalPages();
	  });

	  $scope.$watch('totalPages', function(value) {
	    setNumPages($scope.$parent, value); // Readonly variable

	    if ( $scope.page > value ) {
	      $scope.selectPage(value);
	    } else {
	      ngModelCtrl.$render();
	    }
	  });
	}])

	.constant('paginationConfig', {
	  itemsPerPage: 10,
	  boundaryLinks: false,
	  directionLinks: true,
	  firstText: 'First',
	  previousText: 'Previous',
	  nextText: 'Next',
	  lastText: 'Last',
	  rotate: true
	})

	.directive('pagination', ['$parse', 'paginationConfig', function($parse, paginationConfig) {
	  return {
	    restrict: 'EA',
	    scope: {
	      totalItems: '=',
	      firstText: '@',
	      previousText: '@',
	      nextText: '@',
	      lastText: '@',
	      onPageChanged: '&',
	      onItemsPerPageChanged: '&'
	    },
	    require: ['pagination', '?ngModel'],
	    controller: 'PaginationController',
	    //templateUrl: 'template/pagination/pagination.html',
	    templateUrl: 'app/components/pagination/pagination.tmpl.html',
	    replace: true,
	    link: function(scope, element, attrs, ctrls) {
	      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      if (!ngModelCtrl) {
	         return; // do nothing if no ng-model
	      }

	      // Setup configuration parameters
	      var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
	          rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
	      scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
	      scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

	      paginationCtrl.init(ngModelCtrl, paginationConfig);

	      if (attrs.maxSize) {
	        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
	          maxSize = parseInt(value, 10);
	          paginationCtrl.render();
	        });
	      }







	      scope.showItemsPerPage = false;

	      scope.toggleDropup = function () {
	      	scope.showItemsPerPage = !scope.showItemsPerPage;
	      };
	      
	      scope.changeItemPerPage = function (newVal) {
	      	//set parent itemPerPage model
	      	var itemPerPageSetter = $parse(attrs.itemsPerPage).assign;
	      	itemPerPageSetter(scope.$parent, newVal);

	      	scope.showItemsPerPage = false;
	        paginationCtrl.itemsPerPage = parseInt(newVal, 10);
	        scope.totalPages = paginationCtrl.calculateTotalPages();
	        scope.selectPage(1);
	        paginationCtrl.render();
	        scope.onItemsPerPageChanged();
		  };







	      // Create page object used in template
	      function makePage(number, text, isActive) {
	        return {
	          number: number,
	          text: text,
	          active: isActive
	        };
	      }

	      function getPages(currentPage, totalPages) {
	        var pages = [];

	        // Default page limits
	        var startPage = 1, endPage = totalPages;
	        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

	        // recompute if maxSize
	        if ( isMaxSized ) {
	          if ( rotate ) {
	            // Current page is displayed in the middle of the visible ones
	            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
	            endPage   = startPage + maxSize - 1;

	            // Adjust if limit is exceeded
	            if (endPage > totalPages) {
	              endPage   = totalPages;
	              startPage = endPage - maxSize + 1;
	            }
	          } else {
	            // Visible pages are paginated with maxSize
	            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

	            // Adjust last page if limit is exceeded
	            endPage = Math.min(startPage + maxSize - 1, totalPages);
	          }
	        }

	        // Add page number links
	        for (var number = startPage; number <= endPage; number++) {
	          var page = makePage(number, number, number === currentPage);
	          pages.push(page);
	        }

	        // Add links to move between page sets
	        if ( isMaxSized && ! rotate ) {
	          if ( startPage > 1 ) {
	            var previousPageSet = makePage(startPage - 1, '...', false);
	            pages.unshift(previousPageSet);
	          }

	          if ( endPage < totalPages ) {
	            var nextPageSet = makePage(endPage + 1, '...', false);
	            pages.push(nextPageSet);
	          }
	        }

	        return pages;
	      }

	      var originalRender = paginationCtrl.render;
	      paginationCtrl.render = function() {
	        originalRender();
	        if (scope.page > 0 && scope.page <= scope.totalPages) {
	          scope.pages = getPages(scope.page, scope.totalPages);
	        }
	      };
	    }
	  };
	}])

	.constant('pagerConfig', {
	  itemsPerPage: 10,
	  previousText: '« Previous',
	  nextText: 'Next »',
	  align: true
	})

	.directive('pager', ['pagerConfig', function(pagerConfig) {
	  return {
	    restrict: 'EA',
	    scope: {
	      totalItems: '=',
	      previousText: '@',
	      nextText: '@'
	    },
	    require: ['pager', '?ngModel'],
	    controller: 'PaginationController',
	    //templateUrl: 'template/pagination/pager.html',
	    templateUrl: 'app/components/pagination/pager.tmpl.html',
	    replace: true,
	    link: function(scope, element, attrs, ctrls) {
	      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      if (!ngModelCtrl) {
	         return; // do nothing if no ng-model
	      }

	      scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
	      paginationCtrl.init(ngModelCtrl, pagerConfig);
	    }
	  };
	}]);

})();
(function(){

	'use strict';

	angular.module('uikit.components.paymentForm', [])

		.directive('sfPaymentForm', function () {
			return {
				restrict: 'E',
				templateUrl: function (element, attrs) {
					var view = attrs.view || 'tab';
					return 'app/components/paymentForm/paymentForm-' + view + '.tmpl.html';
				},
				scope: {
					paymentOptions: '=ngModel',
					proceed: '&'
				},
				bindToController: true,
				controller: function () {
					//asdsad
				},
				controllerAs: 'ctrl',
				link: function (scope, element, attrs, ngModelCtrl) {
					//asd
				}
			};
		});

})();
(function(){

	'use strict';

	angular.module('uikit.components.paymentFormManager', []);

})();
(function(){
'use strict';
angular.module('uikit.components.productInfo', [])
  .directive('sfProductInfo', sfProductInfoDirective);


function sfProductInfoDirective(){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/productInfo/productInfo.tmpl.html',
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			item: '=ngModel'
		}
	};

}
})();
(function(){

'use strict';

	angular.module('uikit.components.productItem', [])

		.directive('sfProductItem', function ($mdTheming) {
			return {
				restrict: 'E',
				require: "^?sfProductList",
				templateUrl: 'app/components/productItem/productItem.tmpl.html',
				scope: {
					item: '=ngModel',
					itemLayout: '@',
					showImage: '@',
					showName: '@',
					showDescription: '@',
					showPrice: '@',
					showMenu: '@',
					showQuantity: '@',
					showPromotion: '@',
					selectable: '@',
					click: '&',
					menuActions: '=',
					addToCart: '&'
				},
				// Check for angular 1.4 bindToController usage: http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html#improvements-in-14
				bindToController: true,
				controller: function () {
					//console.log('ctrl', this.addToCart);
				},
				controllerAs: 'ctrl',
				link: function (scope, element, attrs, ctrl) {
					scope.ctrl.showAddToCartButton = attrs.addToCart ? 'true' : 'false';
					scope.ctrl.itemLayout = 'list';
					scope.ctrl.predefineQuantity = false;
					scope.ctrl.quantity = {
						value: 1,
						step: 100,
						min:100,
						max: 5000
					};

					if (ctrl) {
						scope.ctrl.showMenu = scope.ctrl.showMenu || ctrl.showMenu;
						scope.ctrl.showImage = scope.ctrl.showImage || ctrl.showImage;
						scope.ctrl.showName = scope.ctrl.showName || ctrl.showName;
						scope.ctrl.showDescription = scope.ctrl.showDescription || ctrl.showDescription;
						scope.ctrl.showPrice = scope.ctrl.showPrice || ctrl.showPrice;
						scope.ctrl.showQuantity = scope.ctrl.showQuantity || ctrl.showQuantity;
						scope.ctrl.showPromotion = scope.ctrl.showPromotion || ctrl.showPromotion;
						scope.ctrl.selectable = scope.ctrl.selectable || ctrl.selectable;
					}

					scope.ctrl.itemLayout = scope.ctrl.itemLayout || 'grid';
				}
			};

			//function link (scope, element){
			//	$mdTheming(element);
			//}
			
		});

})();
(function(){
'use strict';
angular.module('uikit.components.productOptions', [])
  .directive('sfProductOptions', sfProductOptionsDirective);


function sfProductOptionsDirective($mdTheming){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/productOptions/productOptions.tmpl.html',
		link: postLink,
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			item: '=ngModel'
		}
	};

	function postLink (scope, element){
		$mdTheming(element);
	}
}
})();
(function(){
'use strict';
angular.module('uikit.components.productPrice', [])
  .directive('sfproductPrice', sfproductPriceDirective);


function sfproductPriceDirective(){
	return {
		restrict: 'E',
		transclude: true,
		template: '1231321',
		controller: function(){
			console.log('12');
		},
		controllerAs: 'ctrl',
		bindToController: true
	};
}
})();
(function(){
'use strict';
angular.module('uikit.components.search', [])
  .directive('sfSearch', sfSearchDirective);


function sfSearchDirective($mdTheming){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/search/search.tmpl.html',
		link: postLink,
		controller: function (){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			search: '=ngModel'
		}
	};

	function postLink (scope, element){
		$mdTheming(element);
	}

}
})();
(function(){
'use strict';
angular.module('uikit.components.sort', [])
  .directive('sfSort', sfSortDirective);


function sfSortDirective($mdTheming){
	return {
		restrict: 'E',
		transclude: true,
		template: getTemplate,
		link: postLink,
		controller: function(){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			item: '=ngModel'
		}
	};

	function postLink (scope, element){
		$mdTheming(element);
	}
	function getTemplate (){
		return '<div>this is sorter</div>';
	}
}
})();
(function(){
'use strict';
angular.module('uikit.components.userinfo', [])
  .directive('sfUserInfo', sfUserInfoDirective);


function sfUserInfoDirective($mdTheming){
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'app/components/userInfo/userInfo.tmpl.html',
		link: postLink,
		controller: function (){},
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			user: '=ngModel'
		}
	};

	function postLink (scope, element){
		$mdTheming(element);
	}

}
})();
