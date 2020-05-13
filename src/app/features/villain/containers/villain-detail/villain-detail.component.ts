import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-villain-detail",
  templateUrl: "./villain-detail.component.html",
  styleUrls: ["./villain-detail.component.css"]
})
export class VillainDetailComponent implements OnInit {
  id: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getVillain();
  }

  private getVillain(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
