import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SongsComponent } from './songs/songs.component';
import { UsersComponent } from './users/users.component';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { AddSongComponent } from './add-song/add-song.component';
import { FiltersComponent } from './filters/filters.component';
import { SongPageComponent } from './song-page/song-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { GroupComponent } from './group/group.component';
import { RatingsComponent } from './ratings/ratings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'group', component: GroupComponent },
  { path: 'account', component: AccountComponent },
  { path: 'add-song', component: AddSongComponent },
  { path: 'filter', component: FiltersComponent },
  { path: 'song/:id', component: SongPageComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: '', component: AppComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
