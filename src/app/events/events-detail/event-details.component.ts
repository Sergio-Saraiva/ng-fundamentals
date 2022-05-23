import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent, ISession } from '../shared';
import { EventService } from '../shared/event.service';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }

      .event-image {
        height: 100px;
      }

      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy: string = 'all';
  sortBy: string = 'name';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.event = this.eventService.getEventById(
      +this.route.snapshot.params['id']
    );
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((s) => s.id)
    );

    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}