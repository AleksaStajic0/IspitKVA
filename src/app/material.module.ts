import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [MatDialogModule, MatListModule, MatSelectModule ,MatDatepickerModule, MatNativeDateModule ,MatBadgeModule ,ReactiveFormsModule,FormsModule, MatFormFieldModule, MatChipsModule ,FlexLayoutModule ,MatCardModule ,MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatProgressSpinnerModule],
    exports: [MatDialogModule, MatListModule, MatSelectModule ,MatDatepickerModule, MatNativeDateModule ,MatBadgeModule ,ReactiveFormsModule,FormsModule, MatFormFieldModule, MatChipsModule ,FlexLayoutModule ,MatCardModule ,MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatProgressSpinnerModule]
})
export class MaterialModule {
    
}