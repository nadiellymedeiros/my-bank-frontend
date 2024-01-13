export class History {
  id?: number;
  idDonorUser?: number;
  nameDonorUser?: string;
  idRecipientUserUser?: number;
  nameRecipientUser?: string;
  type?: 'transfer' | 'deposit' | 'withdrawal';
  amount?: number;
  date?: string;
}
