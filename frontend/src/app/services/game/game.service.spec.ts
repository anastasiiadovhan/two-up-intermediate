import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });

    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests.
  });

  it('should save game session', () => {
    const mockData = { message: 'Game session saved' };

    service.saveGameSession(1, 100).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/game-sessions/save');
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('should update color', () => {
    const mockData = { message: 'Color updated' };

    service.updateColor(1, 'red').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/game-sessions/update-color');
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('should get color', () => {
    const mockData = { color: 'red' };

    service.getColor(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/game-sessions/get-color/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get leaderboard', () => {
    const mockData = [{userId: '1', score: 10}, {userId: '2', score: 8}];

    service.getLeaderboard().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/game-sessions/leaderboard');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get user highest score', () => {
    const mockData = { score: 100 };

    service.getUserHighestScore(1).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/game-sessions/user-score/1/highest-score');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

});
