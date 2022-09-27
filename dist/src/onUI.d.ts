export declare class onUI {
    private selector;
    private toggle0Num;
    private toggle1Num;
    constructor();
    select(id: string): this;
    on(eventType: string, callback: Function): this;
    get checked(): boolean;
    set checked(flag: boolean);
    get font(): string;
    get val(): string;
    set val(v: string);
    get active(): number;
    set active(targetIdx: number);
    toggleSwitch(): this;
    toggleBtn(text: string): this;
    fontSelector(fontList: string[]): this;
    accordion(labelList: string[]): this;
    multiSlider(): this;
    tab(labelList: string[]): this;
}
