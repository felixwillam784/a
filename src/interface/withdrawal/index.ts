export interface GetDepositOrder {
    id: string
    user_account: string
    platform_order_number: string
    gaia_order_number: string
    upstream_channel: string
    upstream_order_number: string
    order_status: number
    amount_type: string
    recharge_amount: number
    actual_amount: number
    submission_time: string
    order_update_time: string
    recharge_method: string
    tax_number: string
    payment_channel: string
    recharge_type: number
    order_number: string
    deposit_type: number
    order_amount: number
    first_charge_status:boolean
  }

  export type GetDepositOrderResponse = {
    code: number | string
    data: {total_page: number, order_list:Array<GetDepositOrder>}
    message: string
  }
  export type PostRequestResponse = {
    code: number | string
    message: string
  }

  