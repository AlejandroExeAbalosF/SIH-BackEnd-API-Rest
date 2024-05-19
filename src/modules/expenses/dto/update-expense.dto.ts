import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateExpenceDto {
  /**
   * Monto de la expensa.
   * @description Puede ser un número con 2 decimales
   * @example 123.45
   */
  @IsOptional()
  @IsNumber()
  amount: number;

  /**
   * Ticket de la expensa.
   * @description Puede ser un número
   * @example 123
   */
  @IsOptional()
  @IsNumber()
  ticket: number;

  /**
   * Fecha de la expensa.
   * @description Puede ser una fecha?
   * @example '2022-01-01'
   */
  @IsOptional()
  // @IsDate()
  dateGenerated: Date;

  /**
   * Estado de la expensa si esta pagada o no.
   * @description Puede ser un valor booleano
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  state: boolean;
}