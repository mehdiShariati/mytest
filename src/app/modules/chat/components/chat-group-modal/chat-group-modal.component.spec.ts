import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupModalComponent } from './chat-group-modal.component';

describe('ChatGroupModalComponent', () => {
  let component: ChatGroupModalComponent;
  let fixture: ComponentFixture<ChatGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatGroupModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
