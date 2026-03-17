import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { authGuard } from './Core/guards/auth.guard';

export const routes: Routes = [


    // Auth routes (NO layout)
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },

    // Protected layout routes
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./Modules/Dashboard/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
            },

            {
                path: 'product-list',
                loadComponent: () =>
                    import('./Modules/Product/product-list/product-list.component')
                        .then(m => m.ProductListComponent)
            },

            {
                path: 'product-form',
                loadComponent: () =>
                    import('./Modules/Product/add-product/add-product.component')
                        .then(p => p.AddProductComponent)
            },

            {
                path: 'product-form/:id',
                loadComponent: () =>
                    import('./Modules/Product/add-product/add-product.component')
                        .then(p => p.AddProductComponent)
            },

            {
                path: 'brand-list',
                loadComponent: () =>
                    import('./Modules/Product/Brand/brandlist/brandlist.component')
                        .then(m => m.BrandlistComponent)
            },

            {
                path: 'brand-form',
                loadComponent: () =>
                    import('./Modules/Product/Brand/add-brand/add-brand.component')
                        .then(p => p.AddBrandComponent)
            },

            {
                path: 'brand-form/:id',
                loadComponent: () =>
                    import('./Modules/Product/Brand/add-brand/add-brand.component')
                        .then(p => p.AddBrandComponent)
            },

            {
                path: 'tag-list',
                loadComponent: () =>
                    import('./Modules/Product/Tag/taglist/taglist.component')
                        .then(m => m.TaglistComponent)
            },

            {
                path: 'tag-form',
                loadComponent: () =>
                    import('./Modules/Product/Tag/add-tag/add-tag.component')
                        .then(p => p.AddTagComponent)
            },

            {
                path: 'tag-form/:id',
                loadComponent: () =>
                    import('./Modules/Product/Tag/add-tag/add-tag.component')
                        .then(p => p.AddTagComponent)
            },

            {
                path: 'employee-list',
                loadComponent: () =>
                    import('./Modules/Employee/employee-list/employee-list.component')
                        .then(m => m.EmployeeListComponent)
            },

            {
                path: 'employee-form',
                loadComponent: () =>
                    import('./Modules/Employee/add-employee/add-employee.component')
                        .then(m => m.AddEmployeeComponent)
            },

            {
                path: 'employee-form/:id',
                loadComponent: () =>
                    import('./Modules/Employee/add-employee/add-employee.component')
                        .then(m => m.AddEmployeeComponent)
            },

            {
                path: 'post-list',
                loadComponent: () =>
                    import('./Modules/Employee/Post/post-list/post-list.component')
                        .then(m => m.PostListComponent)
            },

            {
                path: 'post-form',
                loadComponent: () =>
                    import('./Modules/Employee/Post/add-post/add-post.component')
                        .then(m => m.AddPostComponent)
            },

            {
                path: 'post-form/:id',
                loadComponent: () =>
                    import('./Modules/Employee/Post/add-post/add-post.component')
                        .then(m => m.AddPostComponent)
            },

            {
                path: 'customer-list',
                loadComponent: () =>
                    import('./Modules/Customer/customer-list/customer-list.component')
                        .then(m => m.CustomerListComponent)
            },

            {
                path: 'customer-form',
                loadComponent: () =>
                    import('./Modules/Customer/add-customer/add-customer.component')
                        .then(m => m.AddCustomerComponent)
            },

            {
                path: 'follow-up/:id',
                loadComponent: () =>
                    import('./Modules/Follow-up/follow-up/follow-up.component')
                        .then(m => m.FollowUpComponent)
            },

            {
                path: 'sell-payment/:id',
                loadComponent: () =>
                    import('./Modules/Sell/sell/sell.component')
                        .then(m => m.SellComponent)
            },

            {
                path: 'followup-list',
                loadComponent: () =>
                    import('./Modules/Follow-up/followup-list/followup-list.component')
                        .then(m => m.FollowupListComponent)
            },



            {
                path: 'sell-list',
                loadComponent: () =>
                    import('./Modules/Sell/sell-list/sell-list.component')
                        .then(m => m.SellListComponent)
            },

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: '**', redirectTo: 'login' }


];
