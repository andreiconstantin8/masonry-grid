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
  protected isLoading: boolean = false;
  protected readonly Number = Number;
  protected scrolledBottomCounter: number = 1;
  protected scrolledTopCounter: number = 0;

  constructor(private readonly unsplashService: UnsplashService) {
  }

  ngOnInit() {
    this.loadImages(this.currentPage, 'bottom');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (!this.isLoading && scrollTop === 0) {
      this.scrolledTopCounter++;
      if (this.scrolledBottomCounter >= 2 && this.currentPage > 2) {
        this.currentPage = this.currentPage - 2;
        this.loadImages(this.currentPage, 'top');
      } else if (this.scrolledBottomCounter < 2 && this.currentPage > 1) {
        this.currentPage--;
        this.loadImages(this.currentPage, 'top');
      }
      this.scrolledBottomCounter = 0;
    } else if (!this.isLoading && scrollTop + windowHeight >= documentHeight - 100) {
      this.scrolledBottomCounter++;
      if (this.scrolledTopCounter >= 2 || this.scrolledBottomCounter === this.scrolledTopCounter) {
        this.currentPage = this.currentPage + 2;
        this.loadImages(this.currentPage, 'bottom');
      } else if (this.scrolledTopCounter < 2) {
        this.currentPage++;
        this.loadImages(this.currentPage, 'bottom');
      }
      this.scrolledTopCounter = 0;
    }
  }

  private loadImages(page: number, mode: 'top' | 'bottom'): void {
    this.isLoading = true;
    this.unsplashService.getImages(page).subscribe(
      (newImages) => {
        if (mode === 'top') {
          this.images = [...newImages, ...this.images.slice(0, this.maxImagesInMemory - newImages.length)];
        } else if (mode === 'bottom') {
          this.images = [...this.images.slice(-this.maxImagesInMemory + newImages.length), ...newImages];
        }
        this.isLoading = false;
      }
    );
  }

}
