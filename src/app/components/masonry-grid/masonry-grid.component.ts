import {Component, HostListener, OnInit} from '@angular/core';
import {UnsplashService} from '../../services/unsplash.service';
import {Photo} from '../../models/models';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-masonry-grid',
  templateUrl: './masonry-grid.component.html',
  styleUrls: ['./masonry-grid.component.scss'],
  imports: [
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class MasonryGridComponent implements OnInit {
  protected images: Photo[] = [];
  protected currentPage: number = 1;
  private maxImagesInMemory: number = 60;
  protected loading: boolean = false;
  protected readonly Number = Number;
  protected scrolledBottom: number = 1;
  protected scrolledTop: number = 0;

  constructor(private unsplashService: UnsplashService) {
  }

  ngOnInit() {
    this.loadImages(this.currentPage, 'bottom');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (!this.loading && scrollTop === 0) {
      this.scrolledTop++;
      if (this.scrolledBottom >= 2 && this.currentPage > 2) {
        this.currentPage = this.currentPage - 2;
        this.loadImages(this.currentPage, 'top');
      } else if (this.scrolledBottom < 2 && this.currentPage > 1) {
        this.currentPage--;
        this.loadImages(this.currentPage, 'top');
      }
      this.scrolledBottom = 0;
    } else if (!this.loading && scrollTop + windowHeight >= documentHeight - 100) {
      this.scrolledBottom++;
      if (this.scrolledTop >= 2 || this.scrolledBottom === this.scrolledTop) {
        this.currentPage = this.currentPage + 2;
        this.loadImages(this.currentPage, 'bottom');
      } else if (this.scrolledTop < 2) {
        this.currentPage++;
        this.loadImages(this.currentPage, 'bottom');
      }
      this.scrolledTop = 0;
    }
  }

  private loadImages(page: number, mode: 'top' | 'bottom'): void {
    this.loading = true;
    this.unsplashService.getImages(page).subscribe(
      (newImages) => {
        if (mode === 'top') {
          this.images = [...newImages, ...this.images.slice(0, this.maxImagesInMemory - newImages.length)];
        } else if (mode === 'bottom') {
          this.images = [...this.images.slice(-this.maxImagesInMemory + newImages.length), ...newImages];
        }
        this.loading = false;
      }
    );
  }

}
