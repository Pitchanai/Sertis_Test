import { UserCardCategories } from "./UserCardCategories";
import { UserCardStatus } from "./UserCardStatus";

export type CardValueProps = {
  _id: string,
  isOwner: boolean,
  name: string,
  status: UserCardStatus,
  content: string,
  category: UserCardCategories
}