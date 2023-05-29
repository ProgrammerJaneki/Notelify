export interface NotesModel {
   id: string;
   title: string;
   noteContent: string;
   noteLabel: string;
   complete?: boolean;
   date: any;
   highlight: boolean;
}
