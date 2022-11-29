export interface createLimitDto {

  card_account_id: number
  current_selected_limit : number // column to see the current selected limit
  previous_selected_limit : number  // column to see the last ocurrency of the selected_limit
  previous_id?: number | null// if of the last ocurrency of limit
  current: boolean
}