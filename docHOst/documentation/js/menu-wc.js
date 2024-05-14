'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-new-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' : 'data-bs-target="#xs-components-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' :
                                            'id="xs-components-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthenticationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CashierViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CashierViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckoutPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmationPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmationPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactUsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomerViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditItemPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditItemPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeCreationsMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeCreationsMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GetRoleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetRoleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagerPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagerViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagerViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MilkTeaMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MilkTeaMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuickAddPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuickAddPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RestockReportPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RestockReportPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeasonalItemPopupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeasonalItemPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingCartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingCartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignatureMilkTeaMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignatureMilkTeaMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SlushMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlushMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SmoothieMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmoothieMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WeatherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WeatherComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' : 'data-bs-target="#xs-pipes-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' :
                                            'id="xs-pipes-links-module-AppModule-575685b0dc4f173cd7cd5eb757870a7f8bc2b7eb4631e3724ee3d1306edab299ae9588db8a3236fdc1cc7636b84e8bd39a8d3fa371510cac56569348a1f4558d"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizeAndReplacePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizeAndReplacePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/CapitalizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FormatCamelCasePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormatCamelCasePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReplacePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReplacePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReplaceUnderscoresPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReplaceUnderscoresPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/LearnMoreComponent.html" data-type="entity-link" >LearnMoreComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Customers.html" data-type="entity-link" >Customers</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employees.html" data-type="entity-link" >Employees</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ingredients.html" data-type="entity-link" >Ingredients</a>
                            </li>
                            <li class="link">
                                <a href="classes/Inventory.html" data-type="entity-link" >Inventory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Menu.html" data-type="entity-link" >Menu</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderHistory.html" data-type="entity-link" >OrderHistory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Orders.html" data-type="entity-link" >Orders</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamMember.html" data-type="entity-link" >TeamMember</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActiveComponentService.html" data-type="entity-link" >ActiveComponentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomersService.html" data-type="entity-link" >CustomersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeesService.html" data-type="entity-link" >EmployeesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientsService.html" data-type="entity-link" >IngredientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InventoryService.html" data-type="entity-link" >InventoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MagnifierService.html" data-type="entity-link" >MagnifierService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderHistoryService.html" data-type="entity-link" >OrderHistoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamMemberService.html" data-type="entity-link" >TeamMemberService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CustomerMenuItem.html" data-type="entity-link" >CustomerMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataType.html" data-type="entity-link" >DataType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InventoryItem.html" data-type="entity-link" >InventoryItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InventoryMap.html" data-type="entity-link" >InventoryMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-1.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-2.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-3.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-4.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-5.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-6.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-7.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderItem.html" data-type="entity-link" >OrderItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SalesSummary.html" data-type="entity-link" >SalesSummary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn-1.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn-2.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn-3.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn-4.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableColumn-5.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableConfig.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableConfig-1.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableConfig-2.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableConfig-3.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableConfig-4.html" data-type="entity-link" >TableConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableConfig-5.html" data-type="entity-link" >TableConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});