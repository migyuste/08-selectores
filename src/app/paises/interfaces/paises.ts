export interface PaisSmall {
    name: Name;
    cca3: string;
}
 
export interface Pais {
    name: string;
    cca3: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}
