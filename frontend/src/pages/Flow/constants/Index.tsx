import { DataSelect } from "@/components/Select/Select";

export const dataFramework: DataSelect[] = [
  {
    label: "Select Framework",
    options: [
      { label: "Pytorch", value: "pytorch" },
      { label: "Tensorflow", value: "tensowflow" },
      { label: "Accelerate", value: "huggingface" },
    ],
  },
];
