import { UserCardCategories } from "./UserCardCategories";

export type CardValueProps = {
  _id: string,
  isOwner: boolean,
  name: string,
  status: string,
  content: string,
  category: UserCardCategories
}