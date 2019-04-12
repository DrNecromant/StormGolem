import { Component, OnInit, OnDestroy } from '@angular/core';

import { BlogService } from '@services/blog.service';
import { AuthService } from '@services/auth.service';

import { Observable, merge, Subject} from 'rxjs';

import { IBlogPost } from '@interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from "../states/app.state";
import { EBlogAction } from "../actions/blog.actions";
import { select } from "@ngrx/store";
import { takeUntil, tap } from "rxjs/operators";
import { LoadBlogPosts } from "../actions/blog.actions";

@Component({
  selector: 'sg-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPageContent$: Observable<IBlogPost[]>;
  public selectedBlogPost: number;
  public emptyBlogPost: IBlogPost;
  private unsubsriber: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private store: Store<IAppState>,
  ) {
    this.emptyBlogPost = {id: 0, title: '', body: ''};
  }

  ngOnInit() {
    this.blogPageContent$ = this.store.pipe(
      takeUntil(this.unsubsriber),
      select((state: IAppState) => state.blog.blogPosts),
      tap(result => console.log(result)),
    );

    this.store.dispatch(new LoadBlogPosts());

    merge(this.authService.loggedIn$, this.blogService.action$).pipe(
      takeUntil(this.unsubsriber),
    ).subscribe(() => {
      this.store.dispatch(new LoadBlogPosts());
      this.selectBlogPost(NaN);
    });
  }

  ngOnDestroy(): void {
    this.unsubsriber.next();
    this.unsubsriber.complete();
  }

  selectBlogPost(blogPostId: number) {
    this.selectedBlogPost = blogPostId;
  }

  trackByPostId(index: number, blogPost: IBlogPost): number {
    return blogPost.id;
  }
}
