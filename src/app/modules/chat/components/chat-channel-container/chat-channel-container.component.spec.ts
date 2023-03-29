import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelContainerComponent } from './chat-channel-container.component';

describe('ChatChannelContainerComponent', () => {
  let component: ChatChannelContainerComponent;
  let fixture: ComponentFixture<ChatChannelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatChannelContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatChannelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
