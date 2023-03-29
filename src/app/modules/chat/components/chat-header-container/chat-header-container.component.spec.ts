import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHeaderContainerComponent } from './chat-header-container.component';

describe('ChatHeaderContainerComponent', () => {
  let component: ChatHeaderContainerComponent;
  let fixture: ComponentFixture<ChatHeaderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatHeaderContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
