import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowUpService } from '../../../Core/services/follow-up.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../Core/services/customer.service';
import { MessageService } from 'primeng/api';
import { IApiResponse, ICustomer, IFollowUp, IFollowUpPayload, IFollowupType } from '../../../Core/models/interfaces';


@Component({
  selector: 'app-follow-up',
  imports: [ButtonModule, CardModule, DatePipe, SelectModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './follow-up.component.html',
  styleUrl: './follow-up.component.css'
})
export class FollowUpComponent implements OnInit {

  _activateRoute = inject(ActivatedRoute)
  followupService = inject(FollowUpService)
  customerSrv = inject(CustomerService)
  _MessageSrv = inject(MessageService)
  customerId: string = ''
  CustomerDetails!: ICustomer
  FollowUpOptions: IFollowupType[] = []
  FollowupHistory:IFollowUp[] = []
  Loading: boolean = true;
  _fb = inject(FormBuilder)

  followupForm: FormGroup = this._fb.group({
    followup_Type: ['', Validators.required],
    followup_Date: ['', Validators.required],
    remark: ['', Validators.required],


  })


  ngOnInit(): void {
    this.customerId = this._activateRoute.snapshot.paramMap.get('id')!
    if (this.customerId) {
      this.LoadCustomerById()
    }

    this.FollowupTypes()
    this.LoadFollowupHistory()


  }

  LoadCustomerById() {

    this.customerSrv.getCustomerById(this.customerId).subscribe({
      next: (res: IApiResponse<ICustomer>) => {
        if (res.data) {
          this.CustomerDetails = res.data
          // this.followupForm.patchValue({
          //   name: this.FollowUpDetails.customer.name,
          //   mobile: this.FollowUpDetails.customer.mobile,
          //   address: this.FollowUpDetails.customer.address,
          //   createdAt: this.FollowUpDetails.customer.createdAt,
          //   remark: this.FollowUpDetails.remark

          // })
          this.Loading = false
          console.log('FollowupDetails...', res);
        } else {
          console.log('No Followup Found..', res);
          this.Loading = false
        }

      },
      error: (err) => {
        console.error('something gone wrong..', err);
        this.Loading = false
      }

    })
  }

  LoadFollowupHistory(){
    this.followupService.getFollowupsByCustomerId(this.customerId).subscribe({
      next:(res:IApiResponse<IFollowUp[]>)=> {
          this.FollowupHistory = res.data
          console.log('FollowupHistory', this.FollowupHistory);
          
      }
    })
  }

  FollowupTypes() {
    this.followupService.getFollowupTypes().subscribe({
      next: (res: IFollowupType[]) => {
        this.FollowUpOptions = res
        console.log('Followup Types:', res);
      },
      error: (err) => {
        console.error('Error fetching followup types:', err);

      }
    })
  }

  // AllFollowups() {
  //   this.followupService.getFollowups().subscribe((res: IFollowUp[]) => {
  //     console.log('All Folowups', res);

  //   })
  // }

  submit() {
    if (!this.followupForm.valid) {
      this._MessageSrv.add({
        severity: "warning",
        detail: 'Please fill all credentials !'
      })
      return
    }
    this.submitFolowup()
   
 
  }

  submitFolowup() {
    const payload = {
      customer: this.customerId,
      followup_Type: this.followupForm.value.followup_Type,
      followup_Date: this.followupForm.value.followup_Date,
      remark: this.followupForm.value.remark,
      createdAt: this.followupForm.value.createdAt

    }

    this.followupService.createFollowup(payload).subscribe({
      next: (res: IFollowUpPayload) => {
        this._MessageSrv.add({
          severity: 'success',
          detail: 'Followup has been added'
        })
        alert('Followup has been added !')
        this.resetForm()
         this.LoadFollowupHistory()
       
      }
      , error: (err) => {
        alert(err.message)
        this._MessageSrv.add({
          severity: 'error',
          detail: err
        })
      }
    })
  }


  resetForm() {
    this.followupForm.reset()
  }

}