export interface IComment {
  id: undefined;
  name: string | undefined;
  provincia: string;
  localidad: string;
  fecha: string;
  lugar: string;
  condicion: string | undefined;
  comentarios: string | undefined;
  fotos: string[] | undefined;
  hora: string | undefined;
}

export interface INewComment {
  name: string | undefined;
  provincia: string;
  localidad: string;
  fecha: string;
  lugar: string;
  condicion: string | undefined;
  comentarios: string | undefined;
  hora: string | undefined;
}

export interface ICommentResponse {
  length: any;
  name: string | undefined;
  provincia: string;
  localidad: string;
  fecha: string;
  lugar: string;
  condicion: string | undefined;
  comentarios: string | undefined;
  hora: string | undefined;
  fotos: string[] | undefined;
}
