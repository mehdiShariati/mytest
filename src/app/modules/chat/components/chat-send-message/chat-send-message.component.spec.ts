import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSendMessageComponent } from './chat-send-message.component';

describe('ChatSendMessageComponent', () => {
  let component: ChatSendMessageComponent;
  let fixture: ComponentFixture<ChatSendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatSendMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatSendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
