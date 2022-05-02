import { UserService } from './../core/services/user.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit{

  constructor(
    private templateRef:TemplateRef<any>,
    private userService:UserService,
    private viewContainer:ViewContainerRef
  ) { }

  condition:boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
