import { Component, computed, signal, OnInit, Inject, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GeneratorComponent } from '../components/generator/generator.component';
import { PreviewComponent } from '../components/preview/preview.component';
import { AuthService } from '../services/auth.service';
import { ActionsComponent } from "../components/actions/actions.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, GeneratorComponent, PreviewComponent, ActionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  
}
