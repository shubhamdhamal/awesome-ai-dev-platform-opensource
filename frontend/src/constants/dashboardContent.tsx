import IconPlus from "../assets/icons/IconPlus";
import { IconFolderConnection, IconMarketplace } from "../assets/icons/Index";

export const DASHBOARD_CREATE = [
  {
    index: 1,
    title: <><strong>Train and Deploy</strong> (coming soon)</>,
    subTitle: "If you want to start with raw source code, then train your model with your own data, and optionally deploy it",
    icon: <IconPlus />,
    url: "/train-and-deploy/",
    disabled: true,
  },
  {
    index: 2,
    title: <><strong>Fine-Tune and Deploy</strong></>,
    subTitle: "If you want to Fine-tune pre-trained models, whether its your own model, or from model hubs like HF or Roboflow, or rent from our model marketplace, select this.",
    icon: <IconPlus />,
    url: "/fine-tune-and-deploy/"
  },
  {
    index: 3,
    title: <><strong>Deploy Only</strong></>,
    subTitle: "Deploy models or set up API inference endpoints using your uploaded models, or our decentralized model marketplace, or models from other hubs. We support nearly all popular foundation models.",
    icon: <IconPlus />,
    url: "/deploy/",
  },
  {
    index: 4,
    title: <><strong>Label & Validate Data</strong></>,
    subTitle: "If you only need to label data, validate data, or validate the output of a model, select this option.",
    icon: <IconPlus />,
    url: "/label-and-validate-data/"
  },
  {
    index: 5,
    title: <><strong>Build and Deploy AI Agent Crews</strong></>,
    subTitle: "Create AI teams where each agent has specific roles, tools, and goals, working together to automate any workflows.",
    icon: <IconPlus />,
    url: "https://multiagent.aixblock.io",
  },
]

export const DASHBOARD_COMPUTES = [
  {
    index: 1,
    title: <>Setup infrastructure</>,
    subTitle: "Begin by setting up your storage, server, or GPUs. This setup is done at the account level, allowing all of your team members across projects to access.",
    icon: <IconPlus />,
    url: "/infrastructure/setup-storage/cloud",
  },
  {
    index: 5,
    title: <>Self-host platform</>,
    subTitle: "You can instantly self-host the entire AIxBlock platform on your own infrastructure, ensuring complete privacy and security. No setup fees, no long-term commitments required.",
    icon: <IconFolderConnection />,
    url: "/self-host",
  },
  {
    index: 4,
    title: <>Compute Marketplace</>,
    subTitle: "Explore our decentralized computing marketplace to rent on-demand compute resources. Enjoy diverse global options at fractional costs with no vendor lock-in.",
    icon: <IconMarketplace />,
    url: "/computes/computes-marketplace",
  },
  {
    index: 2,
    title: <>Lease out computes</>,
    subTitle: "If you have idle compute resources that you want to lease out to the marketplace to earn extra money, select this option.",
  },
  // {
  //   index: 3,
  //   title: <>Your Compute List</>,
  //   subTitle: "All the compute resources in your account, including CPU, GPU, server, and storage, are listed here.",
  //   url: "/computes",
  // },
]

export const DASHBOARD_MODELS = [
  {
    index: 2,
    title: <>Commercialize my model</>,
    subTitle: "To commercialize your model, click here. Enjoy easy setup with no listing fees and a small transaction fee only when you earn. No compute resources? No problem. We auto-scale to meet your demand.",
    icon: <IconPlus />,
    url: "/models-seller",
  },
  {
    index: 3,
    title: <>My rented models</>,
    subTitle: "View and manage the list of machine learning models you have rented for your projects.",
    url: "/rented-models",
  },
  {
    index: 4,
    title: <>Model Marketplace</>,
    subTitle: "Check out our model marketplace to rent models for fine-tuning, labeling assistance or API inference endpoints",
    icon: <IconMarketplace />,
    url: "/models-marketplace",
  },
]
