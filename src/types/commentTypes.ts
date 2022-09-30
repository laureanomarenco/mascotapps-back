export interface IComment {
  id: undefined;
  nombre: string | undefined;
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
  nombre: string | undefined;
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
  nombre: string | undefined;
  provincia: string;
  localidad: string;
  fecha: string;
  lugar: string;
  condicion: string | undefined;
  comentarios: string | undefined;
  hora: string | undefined;
  fotos: string[] | undefined;
}
