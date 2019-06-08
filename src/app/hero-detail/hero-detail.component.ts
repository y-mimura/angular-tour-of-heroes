import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    // route.snapshotはコンポーネントが作成された直後のルート情報の静的イメージ
    // paramMapは、URL から抽出されたルートパラメータ値の辞書
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
