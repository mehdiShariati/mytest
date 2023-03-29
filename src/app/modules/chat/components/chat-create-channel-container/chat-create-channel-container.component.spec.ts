import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCreateChannelContainerComponent } from './chat-create-channel-container.component';

describe('ChatCreateChannelContainerComponent', () => {
  let component: ChatCreateChannelContainerComponent;
  let fixture: ComponentFixture<ChatCreateChannelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatCreateChannelContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatCreateChannelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
