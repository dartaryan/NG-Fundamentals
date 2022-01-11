import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { Observable, of } from 'rxjs';

describe('VoterService', () => {
  let voterService: VoterService, mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should delete the voter from the list of voters', () => {
      var session = { id: 6, voters: ['boots', 'chipidi'] };
      mockHttp.delete.and.returnValue(of(false));
      voterService.deleteVoter(3, <ISession>session, 'boots');
      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('chipidi');
    });

    it('should call http.delete with the right URL', () => {
      var session = { id: 6, voters: ['boots', 'chipidi'] };
      mockHttp.delete.and.returnValue(of(false));
      voterService.deleteVoter(3, <ISession>session, 'boots');
      expect(mockHttp.delete).toHaveBeenCalledWith(
        '/api/events/3/sessions/6/voters/boots'
      );
    });
  });
  describe('addVoter', () => {

    it('should call http.post with the right URL', () => {
        var session = { id: 6, voters: ['chipidi'] };
        mockHttp.post.and.returnValue(of(false));
        voterService.addVoter(3, <ISession>session, 'boots');
        expect(mockHttp.post).toHaveBeenCalledWith(
          '/api/events/3/sessions/6/voters/boots',{},jasmine.any(Object)
        );
      });
  })
});
