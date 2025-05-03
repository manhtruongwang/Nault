declare namespace NodeJS {
  interface Require {
    (id: string): any;
    resolve: (id: string) => string;
    cache: any;
    extensions: any;
    main: any;
  }
}
