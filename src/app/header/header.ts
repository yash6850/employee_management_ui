import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [Menubar],
   templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header implements OnInit {
    @ViewChild(Menubar) menubar?: Menubar;
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Register',
                icon: 'pi pi-user-plus',
                routerLink: ['/register'],
                command: () => this.keepMenuOpen()
            },
            {
                label: 'Login',
                icon: 'pi pi-sign-in',
                routerLink: ['/login'],
                command: () => this.keepMenuOpen()
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                routerLink: ['/dashboard'],
                command: () => this.keepMenuOpen()
            },
            {
                label: 'employees',
                icon: 'pi pi-users',
                routerLink: ['/employees'],
                command: () => this.keepMenuOpen()
                    },
                    {
                label: 'Leaves',
                icon: 'pi pi-calendar',
                routerLink: ['/leave'],
                command: () => this.keepMenuOpen()
                    },
                    {
                label: 'Tasks',
                icon: 'pi pi-check-square',
                routerLink: ['/tasks'],
                command: () => this.keepMenuOpen()
            },
        ];
    }

    private keepMenuOpen() {
        setTimeout(() => {
            if (this.menubar) {
                this.menubar.mobileActive = true;
                this.menubar.show();
            }
        });
    }
}
