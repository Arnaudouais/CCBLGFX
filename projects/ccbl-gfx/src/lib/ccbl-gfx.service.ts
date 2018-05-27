import { Injectable } from '@angular/core';
import {HumanReadableProgram} from "ccbl-js/ProgramObjectInterface";

@Injectable()
export class CcblGfxService {
  hrp: HumanReadableProgram;
  environment = {};
  private observers: ((h: HumanReadableProgram) => void)[] = [];

  constructor() { }

  addObserver(o: (h: HumanReadableProgram) => void): void {
    this.observers.push(o);
  }

  loadEnvironment(hrp: HumanReadableProgram): void {
    this.hrp = hrp;
    if (this.hrp.dependencies.import.channels) this.hrp.dependencies.import.channels.forEach(e => this.environment[e.name] = e.type);
    if (this.hrp.dependencies.import.emitters) this.hrp.dependencies.import.emitters.forEach(e => this.environment[e.name] = e.type);
    if (this.hrp.dependencies.import.events) this.hrp.dependencies.import.events.forEach(e => this.environment[e.name] = e.type);
    if (this.hrp.dependencies.export.channels) this.hrp.dependencies.export.channels.forEach(e => this.environment[e.name] = e.type);
    if (this.hrp.dependencies.export.emitters) this.hrp.dependencies.export.emitters.forEach(e => this.environment[e.name] = e.type);
    if (this.hrp.dependencies.export.events) this.hrp.dependencies.export.events.forEach(e => this.environment[e.name] = e.type);
    if (this.hrp.localChannels) this.hrp.localChannels.forEach(e => this.environment[e.name] = e.type);
    this.notifyObserver();
  }

  notifyObserver(): void {
    this.observers.forEach(o => o(this.hrp));
  }

  get environmentNames(): string[] {
    const a = [];
    for (const k in this.environment) a.push(k);
    return a;
  }
}
