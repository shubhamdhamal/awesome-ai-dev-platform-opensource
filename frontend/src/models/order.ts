import {JSONSchemaType} from "ajv";
import createAjvValidator from "../utils/createAjvValidator";

export type TOrder = {
  id: number;
  history_order: string;
  gpu_info: string;
  total_amount: number;
  price: string;
  status: string;
  unit: string;
  payment_method: string;
  payment_code?: string;
  service_fee?: string;
  reward_points_used?: string;
  created_at: string;
  updated_at: string;
  payer_email: string;
  payer_full_name: string;
  user: number;
  model_marketplace?: number;
  compute_gpus: number[];
}

const orderSchema: JSONSchemaType<TOrder> = {
  type: "object",
  properties: {
    id: {type: "integer"},
    history_order: {type: "string"},
    gpu_info: {type: "string"},
    total_amount: {type: "number"},
    price: {type: "string"},
    status: {type: "string"},
    unit: {type: "string"},
    payment_method: {type: "string"},
    payment_code: {type: "string", nullable: true},
    service_fee: {type: "string", nullable: true},
    reward_points_used: {type: "string", nullable: true},
    created_at: {type: "string"},
    updated_at: {type: "string"},
    payer_email: {type: "string"},
    payer_full_name: {type: "string"},
    user: {type: "integer"},
    model_marketplace: {type: "integer", nullable: true},
    compute_gpus: {type: "array", items: {type: "number"}},
  },
  required: [
    "id",
    "history_order",
    "gpu_info",
    "total_amount",
    "price",
    "status",
    "unit",
    "payment_method",
    "created_at",
    "updated_at",
    "payer_email",
    "payer_full_name",
    "user",
    "compute_gpus",
  ],
  additionalProperties: true,
};

export type TOrdersResponseDTO = {
  count: number;
  next?: string;
  previous?: string;
  results: TOrder[];
};

const ordersResponseSchema: JSONSchemaType<TOrdersResponseDTO> = {
  type: "object",
  properties: {
    count: {type: "integer"},
    next: {type: "string", nullable: true},
    previous: {type: "string", nullable: true},
    results: {type: "array", items: orderSchema},
  },
  required: ["count"],
  additionalProperties: true,
};

export const validateOrdersResponse = createAjvValidator<TOrdersResponseDTO>(ordersResponseSchema);
