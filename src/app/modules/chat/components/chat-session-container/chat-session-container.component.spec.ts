import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSessionContainerComponent } from './chat-session-container.component';

describe('ChatSessionContainerComponent', () => {
  let component: ChatSessionContainerComponent;
  let fixture: ComponentFixture<ChatSessionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatSessionContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatSessionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
