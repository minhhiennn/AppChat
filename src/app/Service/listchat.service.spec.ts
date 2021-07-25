import { TestBed } from '@angular/core/testing';

import { ListChatService } from './listchat.service';

describe('FriendlistService', () => {
  let service: ListChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
