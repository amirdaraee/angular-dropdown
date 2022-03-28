import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { pluck } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { SearchResult } from '../autocomplete/search-result.model';
import { SearchService } from '../autocomplete/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements AfterViewInit {
  @ViewChild('input') inputElement: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  results: SearchResult[];
  inputTouched = false;
  loading = false;

  constructor(private searchService: SearchService, private el: ElementRef) {}

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((value: string) => value.length > 3),
        map((value) => value)
      )
      .subscribe(value => {
        this.handleSearch(value);
      });
  }

  handleSearch(inputValue: string) {
    this.results = [];
    this.loading = true;
    this.searchService.search(inputValue)
      .subscribe((items: any) => {
        this.results = items
        console.log(this.results)
        this.inputTouched = true;
        this.loading = false;
      });
  }
}
