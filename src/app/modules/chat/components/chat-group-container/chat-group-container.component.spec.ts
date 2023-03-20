import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupContainerComponent } from './chat-group-container.component';

describe('ChatGroupContainerComponent', () => {
  let component: ChatGroupContainerComponent;
  let fixture: ComponentFixture<ChatGroupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatGroupContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
