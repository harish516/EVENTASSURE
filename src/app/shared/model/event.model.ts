export class UserEvent {
  name: string;
  date: Date;
  location: string;
  risk: number;
  color: string;

  public constructor(init?: Partial<UserEvent>) {
    Object.assign(this, init);
    if (this.risk < 0.4) {
      this.color = 'successtwo';
    } else if (this.risk < 0.7) {
      this.color = 'warningtwo';
    } else {
      this.color = 'dangertwo';
    }
  }
}
