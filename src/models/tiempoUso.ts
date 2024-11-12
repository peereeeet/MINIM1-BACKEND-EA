import { model, Schema, Document } from 'mongoose';

export interface TiemposDeUsoDocument extends Document {
  usuarioId: Schema.Types.ObjectId;
  fechaInicio: Date;
  fechaFin: Date;
  tiempoTotal: number;
}

const TiemposDeUsoSchema = new Schema<TiemposDeUsoDocument>({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  fechaInicio: { type: Date, required: true }, 
  fechaFin: { type: Date, required: true }, 
  tiempoTotal: { type: Number, required: true },
});

export const TiemposDeUso = model<TiemposDeUsoDocument>('TiemposDeUso', TiemposDeUsoSchema);
