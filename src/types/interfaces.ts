export interface IfcFolder {
  uuid: string;
  name: string;
  timestamp: string;
}

export interface IfcNote {
  uuid: string;
  name: string;
  content: string;
  timestamp: string;
}

export interface IfcNoteContent extends IfcNote {
  content: string;
}

export interface IfcUser {
  uid: string;
}