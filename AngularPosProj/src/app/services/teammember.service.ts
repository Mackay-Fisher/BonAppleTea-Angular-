import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `TeamMemberService` provides methods to fetch and manage team member data.
 */
@Injectable({ providedIn: 'root' })
export class TeamMemberService {
  /**
   * The base URL for the team member API.
   */
  private baseUrl = `https://bonappetea.onrender.com/api/teammembers`;
  /**
   * Constructor for `TeamMemberService`.
   * @param http The HttpClient module to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of team members from the API.
   * @returns An Observable containing team member data.
   */
  getTeamMembers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}