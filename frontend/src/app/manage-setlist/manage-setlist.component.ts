import { Component, OnInit } from '@angular/core';
import { SetlistService, Setlist } from '../setlist.service';
import { MatSnackBar } from '@angular/material';

const now = new Date();

@Component({
  selector: 'app-manage-setlist',
  templateUrl: './manage-setlist.component.html',
  styleUrls: ['./manage-setlist.component.scss'],
})
export class ManageSetlistComponent implements OnInit {
  newSetlistTitle = '';
  newSuggestDeadline = '';
  newVoteDeadline = '';
  currentSetlist: Setlist;

  constructor(
    private snackBar: MatSnackBar,
    private setlistService: SetlistService,
  ) { }

  ngOnInit() {
    this.setlistService.currentSetlist.subscribe(newCurrentSetlist => {
      this.currentSetlist = newCurrentSetlist;
      if (newCurrentSetlist) {
        this.newSuggestDeadline = newCurrentSetlist.suggestDeadline.toISOString();
        this.newVoteDeadline = newCurrentSetlist.voteDeadline.toISOString();
      }
    });
  }

  edit() {
    this.setlistService.editSetlistDeadlines(this.currentSetlist.id, {
      suggestDeadline: new Date(this.newSuggestDeadline),
      voteDeadline: new Date(this.newVoteDeadline),
    })
      .subscribe(
        () => this.snackBar.open('Deadlines updated.', 'dismiss'),
        failure => this.snackBar.open(failure.error, 'dismiss'),
      );
  }

  create() {
    this.setlistService.createSetlist(this.newSetlistTitle)
      .subscribe(
        ({ title }) => this.snackBar.open(`Setlist "${title}" has been created.`, 'dismiss'),
        failure => this.snackBar.open(failure.error, 'dismiss'),
      );
  }

}