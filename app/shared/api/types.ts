//el T simplemente significa parametro generico - el ? significa opcional
//Record<string, string[]> es un objeto cuyas propertys son dinamicas
export interface ApiSuccess<T> {
    success: true;
    message?: string; 
    data: T ;
    pagination?: { page: number; limit: number; total: number; totalPages: number };

}

export interface ApiErrorBody {
  success: false;
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}
