import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMenuContainerComponent } from './chat-menu-container.component';

describe('MenuContainerComponent', () => {
  let component: ChatMenuContainerComponent;
  let fixture: ComponentFixture<ChatMenuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatMenuContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
