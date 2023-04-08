import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatReplyPreviewComponent } from './chat-reply-preview.component';

describe('ChatReplyPreviewComponent', () => {
  let component: ChatReplyPreviewComponent;
  let fixture: ComponentFixture<ChatReplyPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatReplyPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatReplyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
