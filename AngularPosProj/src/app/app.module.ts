import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CashierViewComponent } from './cashier-view/cashier-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { MenuViewComponent } from './menu-view/menu-view.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { WeatherComponent } from './weather/weather.component';
import { CartService } from './cart-modal/cart-modal.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { MilkTeaMenuComponent } from './milk-tea-menu/milk-tea-menu.component';
import { SignatureMilkTeaMenuComponent } from './signature-milk-tea-menu/signature-milk-tea-menu.component';
import { SlushMenuComponent } from './slush-menu/slush-menu.component';
import { SmoothieMenuComponent } from './smoothie-menu/smoothie-menu.component';
import { EmployeeCreationsMenuComponent } from './employee-creations-menu/employee-creations-menu.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { ManagerPopupComponent } from './manager-view/manager-popup/manager-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReplaceUnderscoresPipe } from './pipes/UnderlineRemovat.pipe.service';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { GetRoleComponent } from './components/get-role/get-role.component';
import { EditItemPopupComponent } from './manager-view/edit-item-popup/edit-item-popup.component';
import { ConfirmationPopupComponent } from './manager-view/confirmation-popup/confirmation-popup.component';
import { QuickAddPopupComponent } from './manager-view/quick-add-popup/quick-add-popup.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CapitalizeAndReplacePipe } from './pipes/capitalize-and-replace.pipe';
import { IceLevelReformatPipe } from './pipes/ice-level-reformat.pipe';
import { RestockReportPopupComponent } from './manager-view/restock-report-popup/restock-report-popup.component';
import { FormatCamelCasePipe } from './pipes/format-camel-case.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutPopupComponent } from './shopping-cart/checkout-popup/checkout-popup.component';

import { SeasonalItemPopupComponent } from './manager-view/seasonal-item-popup/seasonal-item-popup.component';
import { CommonModule } from '@angular/common';

import { TextSelectionDirective } from './text-selection.directive';
import { SugarLevelFormatPipe } from './pipes/sugar-level-format.pipe';


@NgModule({
  declarations: [
    ReplaceUnderscoresPipe,
    AppComponent,
    NavMenuComponent,
    CustomerViewComponent,
    CashierViewComponent,
    ManagerViewComponent,
    MenuViewComponent,
    CartModalComponent,
    WeatherComponent,
    LoginButtonComponent,
    MilkTeaMenuComponent,
    SignatureMilkTeaMenuComponent,
    SlushMenuComponent,
    SmoothieMenuComponent,
    EmployeeCreationsMenuComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    ReplacePipe,
    CapitalizePipe,
    AuthenticationButtonComponent,
    ManagerPopupComponent,
    ProfileComponent,
    MenuItemComponent,
    GetRoleComponent,
    EditItemPopupComponent,
    ConfirmationPopupComponent,
    QuickAddPopupComponent,
    ShoppingCartComponent,
    CapitalizeAndReplacePipe,
    IceLevelReformatPipe,
    SugarLevelFormatPipe,
    RestockReportPopupComponent,
    FormatCamelCasePipe,
    ContactUsComponent,
    CheckoutPopupComponent,
    SeasonalItemPopupComponent,
    TextSelectionDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CustomerViewComponent, pathMatch: 'full' },
      { path: 'Cashier', component: CashierViewComponent },
      { path: 'Manager', component: ManagerViewComponent },
      { path: 'Menu', component: MenuViewComponent },
      { path: 'Menu/Milk-Tea', component: MilkTeaMenuComponent },
      { path: 'Menu/Signature-Milk-Tea', component: SignatureMilkTeaMenuComponent },
      { path: 'Menu/Slush', component: SlushMenuComponent },
      { path: 'Menu/Smoothies', component: SmoothieMenuComponent },
      { path: 'Menu/Employee-Creations', component: EmployeeCreationsMenuComponent },
      { path: 'Menu/:type/:name', component: MenuItemComponent },
      { path: 'Menu/:type/:name/:index', component: MenuItemComponent },
      { path: 'ShoppingCart', component: ShoppingCartComponent },
    ]),
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
