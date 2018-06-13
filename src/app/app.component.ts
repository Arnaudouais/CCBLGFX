import {Component, OnInit} from '@angular/core';
import {CcblGfxService} from "../../projects/ccbl-gfx/src/lib/ccbl-gfx.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ccblGfxService: CcblGfxService) {
  }

  ngOnInit() {
    const program = {
      dependencies: {
        // sourceEnvironment: rootProg.getEnvironment(),
        import: {
          channels: [
            {name: "lampAvatar", type: "color"}
          ],
          emitters: [
            {name: "BobAtHome", type: "boolean"},
            {name: "AliceAtHome", type: "boolean"},
            {name: "AliceAtBobHome", type: "boolean"},
            {name: "AliceAvailable", type: "boolean"},
          ]
        },
        export: {
          channels: [
            {name: "MusicMode", type: "string"}
          ]
        }
      },
      localChannels: [
      ],
      actions: [
        {channel: "lampAvatar", affectation: {value: `"off"`}},
        {channel: "MusicMode" , affectation: {value: `"off"`}}
      ],
      allen: {
        During: [
          {
            contextName: "BobIsAtHome",
            state: "BobAtHome",
            allen: {
              During: [
                {
                  contextName: "AliceIsAtHome",
                  state: "AliceAtHome",
                  actions: [
                    {channel: "lampAvatar", affectation: {value: `"orange"`}}
                  ],
                  allen: {
                    During: [
                      {
                        contextName: "AliceISAvailable",
                        state: "AliceAvailable",
                        actions: [
                          {channel: "lampAvatar", affectation: {value: `"green"`}}
                        ]
                      }
                    ]
                  }
                },
                {
                  contextName: "AliceIsAtBobsHome",
                  state: "AliceAtBobHome",
                  actions: [
                    {channel: "lampAvatar", affectation: {value: `"white"`}},
                    {channel: "MusicMode" , affectation: {value: `"Barry White"`}}
                  ]
                }
              ]
            }
          }
        ]
      }
    };
    this.ccblGfxService.loadEnvironment(program);
  }
}
