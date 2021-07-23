
export class Icons {
  src: string;
  ALT: string;
  constructor(  src: string, ALT: string) { 
    this.src = src;
    this.ALT = ALT;
  }
  public set $src(value: string) {
		this.src = value;
	}
}
