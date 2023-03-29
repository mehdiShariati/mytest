import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCreateGroupContainerComponent } from './chat-create-group-container.component';

describe('ChatCreateGroupContainerComponent', () => {
  let component: ChatCreateGroupContainerComponent;
  let fixture: ComponentFixture<ChatCreateGroupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatCreateGroupContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatCreateGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
