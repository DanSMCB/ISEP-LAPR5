import { IPassagemPersistence } from "../../dataschema/IPassagemPersistence";
import mongoose from "mongoose";

const passagemSchema = new mongoose.Schema({
  domainId: {
    type: String,
    unique: true
  },
  passagemId: {
    type: String,
    unique: true
  },
  connection: {
    type: [
      {
        edificio: {
          type: mongoose.Schema.Types.String,
          ref: "Edificio",
          required: true
        },
        piso: {
          type: mongoose.Schema.Types.String,
          ref: "Piso",
          required: true
        }
      }
    ],
    validate: [
       /* {
        validator: function(value) {
          return value.every(connection => {
            return (
              connection.piso.edificio.toString() ===
              connection.edificio.toString()
            );
          });
        },
        message:
          'The "connection" array must contain valid Piso-Edificio relationships.'
      },  */
      {
        validator: function(value) {
          return value.length === 2;
        },
        message: 'The "connection" array must contain exactly 2 objects.'
      }
    ],
    required: true
  }
});

export default mongoose.model<IPassagemPersistence & mongoose.Document>(
  "Passagem",
  passagemSchema
);
