import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


interface Breadcrumb {
  name: string;
  link: string;
}
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  breadCrumbList : Breadcrumb[] = [];

  @Input() MenuItemsList: Breadcrumb[] = [];
  

}
