// product.dto.ts
export class ItemsDto {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  type: ItemType;
  showDetails: boolean;
}

export class CartItemDto {
  id: number;
  name: string;
  price: number;
  type: string;
  quantity: number;
}

export class OrderDto {
  items: ItemsDto[];
  grandTotal: number;
  orderInfo: UserInfoDto;
  date: string;
}

export class UserInfoDto{
  firstName: string;
  lastName: string;
  city: string;
  phonenumber: string;
  email: string;
  address: string;
}

export class ItemType{
  id: number;
  type: string;
  checked: boolean
}
