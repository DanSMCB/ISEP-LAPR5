import { IPisoPersistence } from '../../dataschema/IPisoPersistence';
import mongoose from 'mongoose';

const pisoSchema = new mongoose.Schema({
    domainId: {
      type: String,
      unique: true,
    },
    edificio: {
      type: mongoose.Schema.Types.String,
      ref: 'Edificio',
      required: true,
    },
    piso: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      maxlength: 250,
      required: false,
    },
    passagens: [{
      type: mongoose.Schema.Types.String,
      ref: 'Passagem',
      required: false,
    }],
    salas: [{
      type: mongoose.Schema.Types.String,
      ref: 'Sala',
      required: false,
    }]
  },
  { timestamps: true },
  );

export default mongoose.model<IPisoPersistence & mongoose.Document>('Piso', pisoSchema);