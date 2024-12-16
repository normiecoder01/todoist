import { Routes } from '@angular/router';
export const routes: Routes = [
    { path: '', loadChildren : ()=> import('../app/modules/public/public.module').then(m=> m.PublicModule) },
    {path : 'user' , loadChildren: ()=> import('../app/modules/user/user.module').then(m=> m.UserModule), },
    { path: 'admin', loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule),
        
     }
];
