import { Component, HostBinding, Sanitizer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, of, startWith } from 'rxjs';
import * as _marked from 'marked';
import { createMarkdown } from 'safe-marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent {

  markdown = new FormControl('# Title');
  html$ = new Observable<SafeHtml>()

  constructor(private sanitizer: DomSanitizer) {
    this.html$ = this.markdown.valueChanges.pipe(
      startWith(this.markdown.value),
      debounceTime(300),
      map(s => {
        const markdown = createMarkdown();
        return sanitizer.bypassSecurityTrustHtml(markdown(s));
      })
    );
  }
}
