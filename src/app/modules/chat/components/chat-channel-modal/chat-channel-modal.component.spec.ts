import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelModalComponent } from './chat-channel-modal.component';

describe('ChatChannelModalComponent', () => {
  let component: ChatChannelModalComponent;
  let fixture: ComponentFixture<ChatChannelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatChannelModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
