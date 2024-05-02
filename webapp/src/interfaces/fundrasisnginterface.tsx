interface FundRaisingForm {
    cause_type: string;
    fundriser_name: string;
    fundriser_email: string;
    fundriser_phoneNumber: number;
    beneficiary_type: string;
    beneficiary_name: string;
    description: string;
    beneficiary_location: string;
    title: string;
    end_date: string;
    image?: string;
    required_amount: number;
    supports: any[];
  }

export default FundRaisingForm;