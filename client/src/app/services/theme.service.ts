import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    this.setTheme(prefersDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkMode.value);
  }

  private setTheme(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
