import {Utilizador} from "../models/utilizador";
import {UtilizadorDTO} from "../DTO/utilizador-dto";

export class UtilizadorMap {

  public static toDTO(utilizador: Utilizador): UtilizadorDTO {
    return {
      firstName: utilizador.firstName,
      lastName: utilizador.lastName,
      email: utilizador.email,
      password: utilizador.password,
      role: utilizador.role,
      phone: utilizador.phone,
      taxpayer: utilizador.taxpayer,
      state: utilizador.state
    } as UtilizadorDTO;
  }

  public static toViewModel(utilizadorDTO: UtilizadorDTO): Utilizador {
    return {
        firstName: utilizadorDTO.firstName,
        lastName: utilizadorDTO.lastName,
        email: utilizadorDTO.email,
        password: utilizadorDTO.password,
        role: utilizadorDTO.role,
        phone: utilizadorDTO.phone,
        taxpayer: utilizadorDTO.taxpayer,
        state: utilizadorDTO.state
    } as Utilizador;
  }

  public static toViewModelList(utilizadorDTOList: UtilizadorDTO[]): Utilizador[] {
    var listUtilizador: Utilizador[];
    listUtilizador=[];
    utilizadorDTOList.forEach(element => {
        listUtilizador.push(UtilizadorMap.toViewModel(element))
    });

    return listUtilizador;
  }
}