import { NgFor, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

import { EmployeeService } from '../../../Core/services/employee.service';
import { IApiResponse, IEmployee, IPost } from '../../../Core/models/interfaces';


@Component({
  selector: 'app-add-employee',
  imports: [InputTextModule, SelectModule, ReactiveFormsModule, ButtonModule, MessageModule, ToastModule, FormsModule, NgFor, NgClass],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  employeeService = inject(EmployeeService);
  employeePosts: IPost[] = []


  EmployeeForm: FormGroup;
  _router = inject(Router)
  _activateRoute = inject(ActivatedRoute)
  _employeeId!: string
  isEditMode: boolean = false

  formSubmitted = false;
  messageServcie = inject(MessageService)

  constructor(private fb: FormBuilder) {
    this.EmployeeForm = this.fb.group({
      name: ['', Validators.required],
      post: ['', Validators.required],
      joinningDate: ['', Validators.required],
      address: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.PostServer()

    // extracting paramsId
    this._employeeId = this._activateRoute.snapshot.paramMap.get('id')!
    if (this._employeeId) {
      this.isEditMode = true;
      this.getEmployeeById()
    }
  }

  PostServer() {
    this.employeeService.getPosts().subscribe((res: IPost[]) => {
      if (res) {
        this.employeePosts = res
        console.log('posts h ua mhi', this.employeePosts);
      }

    })
  }


  getEmployeeById() {
    // load data & patch value
    this.employeeService.getEmployeeById(this._employeeId).subscribe({
      next: (res: IApiResponse<IEmployee>) => {
        if (res) {
          const employeeDetls = res.data
          const _joinningDate = employeeDetls.joinningDate ? new Date(employeeDetls.joinningDate).toISOString().split('T')[0] : '';
          this.EmployeeForm.patchValue({
            name: employeeDetls.name,
            joinningDate: _joinningDate,
            address: employeeDetls.address,
            post: employeeDetls.post._id
          })
        }
      },
      error: (err) => {
        this.messageServcie.add({
          severity: 'error',
          summary: "Error",
          detail: "Failed to load product"
        })
      }
    })
  }


  submit() {
    this.formSubmitted = true
    if (!this.EmployeeForm.valid) return
    this.isEditMode ? this.updateEmployee() : this.createEmployee()
  }

  createEmployee() {
    this.employeeService.createEmployee(this.EmployeeForm.value).subscribe({
      next: (res: IApiResponse<IEmployee>) => {
        if (res) {
          alert(res.message)
          this.redirectedToProductlist()
          this.showSuccess('Employee Created')
          this.clearField()
        }
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  updateEmployee() {
    this.employeeService.updateEmployeeById(this._employeeId, this.EmployeeForm.value).subscribe({
      next: (res: IApiResponse<IEmployee>) => {
        if (res) {
          alert(res.message);
          console.log(this.EmployeeForm.value, 'bta');

          this.redirectedToProductlist()
          this.showSuccess('Employee Updated')
          this.clearField()
        }
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  showSuccess(message: string) {
    this.messageServcie.add({
      severity: 'success',
      summary: "Success",
      detail: message
    })

  }
  handleError(err: string) {
    console.log('API error', err);
    this.messageServcie.add({
      severity: 'error',
      summary: 'Error',
      detail: err || 'Something went wrong'
    })

  }

  redirectedToProductlist() {
    this._router.navigate(['/employee-list']);
  }

  isInvalid(controlName: string) {
    const control = this.EmployeeForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  clearField() {
    this.EmployeeForm.reset()
  }
}
