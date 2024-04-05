import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsComponent } from './commits.component';
import { RepoService } from '../../services/repo.service';
import { of } from 'rxjs';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;
  let repoServiceSpy: jasmine.SpyObj<RepoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RepoService', ['getCommitsByRepo']);
    await TestBed.configureTestingModule({
      imports: [CommitsComponent],
      providers: [{ provide: RepoService, useValue: spy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    repoServiceSpy = TestBed.inject(RepoService) as jasmine.SpyObj<RepoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load commits details', () => {
    const owner = 'testOwner';
    const repository = 'testRepository';
    const commitsMock = [{ author: 'fehri', url: 'http://test', message: 'Commit 1' }];

    // Set up the mock service method to return observable with mock commits data
    repoServiceSpy.getCommitsByRepo.and.returnValue(of(commitsMock));

    // Call the method to be tested
    component.loadCommitsDetails();

    // Assert that commits$ observable is populated with mock commits data
    component.commits$.subscribe(commits => {
      expect(commits).toEqual(commitsMock);
    });

    // Assert that the service method was called with the correct parameters
    expect(repoServiceSpy.getCommitsByRepo).toHaveBeenCalledWith(owner, repository);
  });
});
