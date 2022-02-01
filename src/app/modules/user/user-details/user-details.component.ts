import { Component, OnInit } from '@angular/core';
import {
  AreaOfInterestDto,
  AreasOfInterestService,
  StudentDataDto,
  TutorDataDto,
  UsersService,
} from 'src/app/generated';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public areas: AreaOfInterestDto[] = [];
  public selectedAreas: AreaOfInterestDto[] = [];

  public student: StudentDataDto[] = undefined!;
  public worker: TutorDataDto = undefined!;

  constructor(
    private areasService: AreasOfInterestService,
    private userService: UsersService
  ) {}

  public ngOnInit(): void {
    this.areasService
      .apiAreasOfInterestGetAreasOfInterestGet()
      .subscribe((data) => {
        this.areas = data;
      });

    this.userService.apiUsersMyDataStudentGet().subscribe((data) => {
      this.student = data;
    });

    this.userService.apiUsersMyDataTutorGet().subscribe((data) => {
      this.worker = data;
      this.selectedAreas = this.areas.filter((a) =>
        data.areasOfInterestIds?.includes(a.id!)
      );
    });
  }

  public saveAreas(): void {
    const selectedAreasIds: number[] = this.selectedAreas.map((a) => a.id!);
    this.userService
      .apiUsersMyDataUpdateAreasOfInterestPost(selectedAreasIds)
      .subscribe();
  }
}
