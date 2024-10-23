import { IElevadorPersistence } from '../../dataschema/IElevadorPersistence';
import mongoose from 'mongoose';

const elevadorSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true,
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    edificio: {
        type: mongoose.Schema.Types.String,
        ref: 'Edificio',
        required: true,
    },
    pisos: [{
      piso: {
        type: mongoose.Schema.Types.String,
        ref: 'Piso',
        required: false,
      }
    }],
  },
  { timestamps: true },
  );

export default mongoose.model<IElevadorPersistence & mongoose.Document>('Elevador', elevadorSchema);