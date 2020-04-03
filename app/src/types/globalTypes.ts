/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ModerationStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortByInput {
  property: string;
  direction: Direction;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
