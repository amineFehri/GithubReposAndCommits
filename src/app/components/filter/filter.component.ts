import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    stars : this.fb.control(0),
    language : this.fb.control(''),
  });

  @Output()
  onReadyCriteria : EventEmitter<any> = new EventEmitter<any>();

  search() : void {
    this.onReadyCriteria.emit(this.filterForm.value);
  }
}
