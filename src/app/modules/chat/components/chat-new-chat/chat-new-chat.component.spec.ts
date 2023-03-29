import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNewChatComponent } from './chat-new-chat.component';

describe('ChatNewChatComponent', () => {
  let component: ChatNewChatComponent;
  let fixture: ComponentFixture<ChatNewChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatNewChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
