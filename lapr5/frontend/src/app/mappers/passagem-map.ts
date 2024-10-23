import {Passagem} from "../models/passagem";
import {PassagemDTO} from "../DTO/passagem-dto";

export class PassagemMap {

  public static toDTO(passagem: Passagem): PassagemDTO {
    return {
      passagemId: passagem.passagemId,
      connection: passagem.connection
    } as PassagemDTO;
  }

  public static toViewModel(passagemDTO: PassagemDTO): Passagem {
    return {
        passagemId: passagemDTO.passagemId,
        connection: passagemDTO.connection
    } as Passagem;
  }

  public static toViewModelList( passagemDTOList: PassagemDTO[]): Passagem[] {
    var listPassagem: Passagem[];
    listPassagem=[];
    passagemDTOList.forEach(element => {
      listPassagem.push(PassagemMap.toViewModel(element))
    });

    return listPassagem;
  }
}
